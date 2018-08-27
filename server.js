const express = require('express');
const next = require('next');
const axios = require('axios');
const Joi = require('joi');
const cookieParser = require('cookie-parser');
const { createJWToken, verifyJWTToken } = require('./lib/jwt');
require('dotenv').config();


const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

const authSchema = Joi.object({
  name: Joi.string().min(1).required(),
  plat: Joi.string().min(2).max(4).valid('pc', 'xbox', 'ps3', 'xone', 'ps4')
    .required(),
});

const playerHeaderSchema = Joi.object({
  // no auth token means no access!
  jwt: Joi.string().required(),
});

app.prepare().then(() => {
  const server = express();

  server.use(cookieParser());

  server.get('/api/auth/', (req, res) => {
    const ret = Joi.validate(req.query, authSchema, {
      // return an error if body has an unrecognised property
      allowUnknown: false,
      // return all errors a payload contains, not just the first one Joi finds
      abortEarly: false,
    });

    if (ret.error) {
      res.status(400).clearCookie('jwt').json({
        status: 'KO',
        message: ret.error.name,
        errors: ret.error.details,
      });
    } else {
      const platforms = {
        pc: 1,
        xbox: 2,
        ps3: 3,
        xone: 4,
        ps4: 5,
      };
      const { name, plat } = ret.value;

      const url = `https://api.bf4stats.com/api/playerInfo?plat=${plat}&name=${name}&opt=assignments,imagePaths,names,upcomingUnlocks,weapons,details,kititems&output=json`;
      axios.get(url).then((json) => {
        const { id } = json.data.player;
        const jwt = createJWToken({
          name,
          id,
          plat: platforms[plat],
        });
        res.cookie('jwt', jwt, {
          httpOnly: true,
          expires: 0,
        }).status(200).json({
          status: 'OK',
          message: 'Authentification successfull',
        });
      }).catch(() => {
        res.status(401).clearCookie('jwt').json({
          status: 'KO',
          message: 'We couldn\'t find your soldier, please check your input or try again later.',
        });
      });
    }
  });

  server.get('/api/player/', (req, res) => {
    const ret = Joi.validate(req.cookies, playerHeaderSchema, {
      // return an error if body has an unrecognised property
      allowUnknown: true,
      // return all errors a payload contains, not just the first one Joi finds
      abortEarly: false,
    });

    if (ret.error) {
      res.status(400).clearCookie('jwt').json({
        status: 'KO',
        message: ret.error.name,
        errors: ret.error.details,
      });
    } else {
      const token = req.cookies.jwt;
      verifyJWTToken(token).then((jwt) => {
        const { name, id, plat } = jwt.data;
        axios.get(`http://battlelog.battlefield.com/bf4/loadout/get/${name}/${id}/${plat}/`)
          .then(soldier => res.json(soldier.data)).catch(() => {
            res.status(401).clearCookie('jwt').end();
          });
      }).catch(() => {
        res.status(401).clearCookie('jwt').end('Error invalidating token');
      });
    }
  });

  server.get('*', (req, res) => handle(req, res));

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
