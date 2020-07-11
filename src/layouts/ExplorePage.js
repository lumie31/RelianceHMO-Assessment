import React from "react";
import NavBar from "../components/common/NavBar";
import Gallery from "../components/ProviderGallery";
import NewProviderForm from "../components/forms/NewProviderForm";
import ApiService from "../utils/apiService";
import LoadingScreen from "../components/common/LoadingScreen";
import { pathGet } from "../utils/utils";

import Grid from "../components/ProviderGrid";
import List from "../components/ProviderList";

class ExplorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
      view: "",
    };

    this.filterProviders = this.filterProviders.bind(this);
  }

  componentDidMount() {
    this.setLoading(true);
    ApiService.get(ApiService.ENDPOINTS.providers).then((data) => {
      // console.log(data)
      this.setState({
        isLoading: false,
        data: data,
      });
    });
  }

  setLoading = (isLoading) => {
    this.setState({
      isLoading,
    });
  };

  filterProviders = (event) => {
    // TASK 2:
    // On input, filter Available Providers based on Name, Address and Type
    //
    // ============== CODE GOES BELOW THIS LINE :) ==============

    // dtaa container providers
    // console.log(this.state.data);

    let paths = pathGet(this.state.data, event.target.value);
    // console.log(paths)
  };

  switchView = (preference) => {
    // TASK 4:
    // onClick on a view preference, switch across the different view options (Gallery, List, Grid)
    // based on whatever the user selects.
    //
    // ============== CODE GOES BELOW THIS LINE :) ==============
    this.setState({
      view: preference,
    });
  };

  render() {
    const { isLoading, data } = this.state;
    console.log(data);
    const items = data.map((item) => ({
      imageUrl: item.images[0]?.url,
      name: item.name,
      description: item.description,
    }));
    return (
      <div className="container">
        <NavBar />
        <div className="content__main">
          <section className="main__top-providers">
            <h2 className="text-header">Our Providers</h2>
            <div className="flex-row box-shadow" style={{ padding: "1rem" }}>
              <div>
                <input
                  type="text"
                  className="input__style_1 input__search"
                  placeholder="&#xf002; Search with Provider Name, Address, or Type"
                  onChange={this.filterProviders}
                  onInput={this.filterProviders}
                />
              </div>
              <div className="layout-switcher">
                <i
                  className="fa fa-images active"
                  onClick={() => this.switchView("gallery")}
                ></i>
                <i className="fa fa-th-large" onClick={() => this.switchView("grid")}></i>
                <i className="fa fa-th-list" onClick={() => this.switchView("list")}></i>
              </div>
            </div>
            {isLoading || !data ? (
              <LoadingScreen />
            ) : (
              <React.Fragment>
                {this.state.view === "list" ? (
                  <List items={items} />
                ) : this.state.view === "grid" ? (
                  <Grid items={items}></Grid>
                ) : (
                  <Gallery items={items} />
                )}
              </React.Fragment>
            )}
          </section>
          <section className="main__new-provider fixed">
            <div className="new-provider">
              <h2 className="text-header">Can't find a Provider?</h2>
              <p className="text-body">Feel free to recommend a new one.</p>
              <hr />
              <NewProviderForm />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default ExplorePage;
