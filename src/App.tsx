import React from 'react';
import API from "./backend/api"

//Components
import Loader from "./components/loading"
import Dropdown from "./components/dropdown"
import Input from "./components/input"
import Button from "./components/button"

// Images
import BRAND from "./assets/Logo_White.png"
import { STORY } from './backend/interface';

import './App.scss';

const List = React.lazy(() => import("./screens/list"));
const Detail = React.lazy(() => import("./screens/detail"));

const defaultState = {
  loading: true,
  screen: {
    height: window.innerHeight,
    width: window.innerWidth,
  },
  story: {},
  stories: [],
  bookmark: {},
  bookmarks: [],
  saveBookmark: false,
  showDetail: false,
  showBookmark: false,
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
          {this.state.showBookmark && <div className="breadcrumb">
            <span className="previous" onClick={this.backToStories.bind(this)}>Stories</span> <span className="divider">/</span> <span className="current">Bookmarks</span>
          </div>}
          {this.state.showDetail && <div className="breadcrumb">
            <span className="previous" onClick={this.backToStories.bind(this)}>Stories</span> <span className="divider">/</span> <span className="current">Details</span>
          </div>}
          {!this.state.loading && !this.state.showDetail && <div className="page-title">
            {this.state.showBookmark ? <h1>All Bookmark</h1> : <h1>Top Stories</h1>}
            <div className="actions">

              {!this.state.showBookmark && <Button primary bookmark stories={this.state.showBookmark} text={"VIEW BOOKMARK"} onClick={this.handleBookmarkSwitch.bind(this)} />}
              <Dropdown placeholder="Select Category" value="new" options={category} onChange={this.filterStories.bind(this)} />
            </div>
          </div>}
          {!this.state.loading && this.state.showDetail && <div className="page-title">
            <Button primary bookmark text={!this.state.saveBookmark ? "ADD BOOKMARK" : "REMOVE BOOKMARK"} onClick={this.handleBookmarkSave.bind(this)} />
          </div>}
          <React.Suspense fallback={<Loader detail="Loading Stories" />}>
            {!this.state.showDetail && !this.state.showBookmark && <List global={this.state} loading={this.state.loading} stories={this.state.stories} onSelect={this.showDetail.bind(this)} />}
            {!this.state.showDetail && this.state.showBookmark && <List global={this.state} loading={this.state.loading} bookmark stories={this.state.bookmarks} onSelect={this.showDetail.bind(this)} />}
            {this.state.showDetail && !this.state.showBookmark && <Detail story={(this.state.story as STORY)} global={this.state} />}
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
      let stories: any = []
      let res = await API.stories.list();
      if (res.error === false) {
        stories = res.result.value
      }
      this.setState({ stories, loading: false })
      // Testing, will be removed on production
      // localStorage.setItem("stories", JSON.stringify(stories))
      // this.setState({ stories: JSON.parse(localStorage.getItem("stories")!), loading: false })

    } catch (error) {
      console.log(error)
    }
  }

  backToStories() {
    this.setState({ story: {}, stories: [], loading: true, showBookmark: false, showDetail: false })
    this.getStories()
  }

  handleBookmarkSwitch() {
    let oldBookmarks = localStorage.getItem("bookmarks")
    let bookmarks = oldBookmarks ? JSON.parse(oldBookmarks) : [];
    this.setState((state: any) => ({ bookmarks, showDetail: false, showBookmark: !state.showBookmark }))
  }

  handleBookmarkSave() {
    let { saveBookmark } = this.state;
    let oldBookmarks = localStorage.getItem("bookmarks")
    let bookmarks = oldBookmarks ? JSON.parse(oldBookmarks) : []
    if (saveBookmark === true) {
      let idx = bookmarks.findIndex((x: any) => x.id === (this.state.story as any).id)
      if (idx !== -1)
        bookmarks.splice(1, idx)
    } else {
      bookmarks.push(this.state.story)
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
    }
    this.setState({ saveBookmark: !saveBookmark })
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

  showDetail(story: STORY) {
    let oldBookmarks = localStorage.getItem("bookmarks")
    let bookmarks = oldBookmarks ? JSON.parse(oldBookmarks) : [];
    let idx = bookmarks.findIndex((x: any) => x.id === story.id)
    this.setState({ story, saveBookmark: idx !== -1 ? true : false, showBookmark: false, showDetail: true })
  }
}

export default App;
