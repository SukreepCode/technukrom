

export default class extends React.Component {
  constructor() {
    super();
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore(ev) {
    ev.preventDefault();
    this.props.onLoad();
  }

  componentDidMount() {
    const { onLoad, isLoading, refInitQuery} = this.props;
    console.log(this.props);
    this.setState({ isLoading: isLoading });
    refInitQuery.then( (value) => {
      onLoad(value);
    })
  }

  render() {
    const { isLoading } = this.props;
    return <center><a className={`button is-primary ${isLoading ? "is-loading" : ""}`} onClick={this.loadMore}>ดูเพิ่มเติม</a></center>
  }
}
