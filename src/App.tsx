import React from 'react';
import API from "./backend/api"
import Loader from "./components/loading"
import Dropdown from "./components/dropdown"
import Input from "./components/input"
import Button from "./components/button"
import BRAND from "./assets/Logo_White.png"
import './App.scss';

const List = React.lazy(() => import("./screens/list"));
const defaultState = {
  loading: true,
  screen: {
    height: window.innerHeight,
    width: window.innerWidth,
  },
  stories: [],
  _stories: [],
  bookmark: false
}
const category = [
  { text: "Newest first", value: "new" },
  { text: "Oldest first", value: "old" },
  { text: "Most popular", value: "popular" },
]
class App extends React.Component {
  state = { ...defaultState }
  render() {
    return (
      <div className="peaks">

        <nav className="navbar">
          <div className="wrapper">
            <div className="brand">
              <img alt="The Peaks" src={BRAND} />
            </div>
            <div className="search-wrapper"><Input type="search" placeholder="Search all news" /></div>
          </div>
        </nav>

        <section className={!this.state.stories.length ? "empty" : "stories"}>
          {!this.state.loading && <div className="page-title">
            {this.state.bookmark ? <h1>All Bookmark</h1> : <h1>Top Stories</h1>}
            <div className="actions">
              <Button primary text={this.state.bookmark ? "VIEW STORIES" : "VIEW BOOKMARK"} onClick={this.handleBookmarkSwitch.bind(this)} />
              <Dropdown placeholder="Select Category" value="new" options={category} onChange={this.filterStories.bind(this)} />
            </div>
          </div>}
          <React.Suspense fallback={<Loader detail="Loading Stories" />}>
            <List global={this.state} loading={this.state.loading} stories={this.state.stories} />
          </React.Suspense>
        </section>
        <footer className="footer"></footer>
      </div>
    );
  }

  componentDidMount() {
    window.addEventListener('resize', this.screenResize.bind(this));
    this.getStories();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.screenResize.bind(this));
  }

  screenResize() {
    let screen = {
      height: window.innerHeight,
      width: window.innerWidth,
    }
    this.setState({ screen })
  }

  async getStories() {
    try {
      let stories = []
      let res = await API.stories.list();
      if (res.error === false) {
        stories = res.result.value
      }
      localStorage.setItem("stories", JSON.stringify(stories))
      this.setState({ stories, loading: false })

    } catch (error) {
      console.log(error)
    }
  }

  handleBookmarkSwitch() {
    this.setState((state: any) => ({ bookmark: !state.bookmark }))
  }

  filterStories(option: any) {
    let { stories } = this.state;

    let sorted = stories.sort((f: any, s: any) => {
      let _s = new Date(s.datePublished).valueOf(), _f = new Date(f.datePublished).valueOf()
      if (_f < _s) {
        return 1
      }

      if (_f > _s) {
        return -1
      }

      if (_f === _s) {
        return 0
      }
      return -1
    });

    if (option.value === "new") {
      this.setState({ stories: sorted })
    }

    if (option.value === "old") {
      this.setState({ stories: sorted.reverse() })
    }

    if (option.value === "popular") {
      this.setState({ stories: sorted.reverse() })
    }
  }
}

export default App;
