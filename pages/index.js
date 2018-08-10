import Link from 'next/link';

export default class test extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      console.log('this is on front');
    }, 500);
  }
  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { userAgent }
  }
  render() {
    return (
      <React.Fragment>
        <div>Welcome to next.js! <Link href="/about"><a>About</a></Link></div>
        <div>Hello World {this.props.userAgent}</div>
      </React.Fragment>
    )
  }
}