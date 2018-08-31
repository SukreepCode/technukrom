

export default class extends React.Component {
  constructor() {
    super();
    this.loadMore = this.loadMore.bind(this);
    this.state={
      isShowLoading: false
    }
  }

  loadMore(ev) {
    ev.preventDefault();
    this.props.onLoad();
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  initQuery(ref) {
    this.setState({ isShowLoading: true })
    if (!this.props.isAutoload) this.props.reset();
    ref.then((value) => {
      this.props.onLoad(value);
    })
  }

  componentDidMount() {
    this.props.onRef(this);
    const { isLoading, refInitQuery, isAutoload } = this.props;
    this.setState({ isLoading: isLoading });

    if (isAutoload) {
      this.setState({ isShowLoading: true })
      this.initQuery(refInitQuery);
    }

  }

  render() {
    const { isShowLoading } = this.state;
    return (
      <div>
        {isShowLoading &&
          <center>
            <a className={`button is-primary ${this.props.isLoading ? "is-loading" : ""}`}
              onClick={this.loadMore}>ดูเพิ่มเติม</a>
          </center>
        }
      </div>)
  }
}
