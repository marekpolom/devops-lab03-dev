import React from "react";
import "./App.css";
import ApiSearch from "./axios/ApiSearch";
import Flag from "./comps/Flag";
import SortBtn from "./comps/SortBtn";
import { Formik} from "formik";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flags: [],
      searchedFlags: [],
      sortBtn: true
    };
  }

  componentDidMount() {
    this.search();
  }

  search = async () => {
    let data = await ApiSearch();

    this.setState({
      flags: data,
      searchedFlags: data,
    });

    console.log(this.state.flags);
  };

  formSearch = (str, cur) => {
    let flags = this.state.flags;

    console.log(cur);

    if(cur !== "default"){
      flags = flags.filter((item) => {
        let x = false;

        item.currencies.forEach((curr) => {
          if(curr.code === cur){
            x = true;
          }
        });

        return x;
      });
    }

    if (str.length > 0) {
      let filter = flags.filter((item) => {
        return item.alpha3Code === str;
      });

      if (str === str.toUpperCase() && filter.length > 0) {
        flags = flags.filter((item) => {
          return filter[0].borders.includes(item.alpha3Code);
        });
      } else {
        let ph = new RegExp(`.*${str.toLowerCase()}.*`);

        flags = flags.filter((item) => {
          let name = item.name.toLowerCase();
          return ph.test(name);
        });
      }
    }

    this.setState({
      searchedFlags: flags,
    });
  };

  sortButton = () => {
    let flags = this.state.searchedFlags;
    let sort = !this.state.sortBtn;

    this.setState({
      searchedFlags: flags.reverse(),
      sortBtn: sort
    });
  };

  render() {
    return (
      <div className="App">
        <div className="search">
          <Formik
            initialValues={{ text: "", currency: "default"}}
            onSubmit={(values, { setSubmitting }) => {
              this.formSearch(values.text, values.currency);
              setSubmitting(false);
            }}
          >
            {({
              values,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="text"
                  placeholder="Country name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.text}
                />
                <select
                  name="currency"
                  value={values.currency}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="default" key="default">PICK CURRENCY</option>
                  {
                    this.state.searchedFlags.map((item) => {
                      return(item.currencies.map((curr) => {
                        let name = '';
                        curr.code === null ? name = curr.name : name = curr.code
                        return(
                          <option value={name} key={name}>{name} ({curr.symbol})</option>
                        );
                      }));
                    })
                  }
                </select>
                <button type="submit" disabled={isSubmitting}>
                  Search
                </button>
              </form>
            )}
          </Formik>
          <SortBtn onClick={this.sortButton}></SortBtn>
        </div>
        <div className="main">
          {this.state.searchedFlags.map((item, index) => {
            return (
              <Flag
                img={item.flag}
                country={item.name}
                index={index}
                key={index}
              ></Flag>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
