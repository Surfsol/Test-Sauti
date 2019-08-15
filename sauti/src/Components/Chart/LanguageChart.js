// Importing dependencies
import React from 'react'; 
import { ResponsiveBar } from "@nivo/bar"; 
import axios from 'axios';

const theme = {
  //background: "#222222",
  axis: {
    // fontSize: "100px",
    // tickColor: "#eee",
    ticks: {
      // line: {
      //   stroke: "#555555"
      // },
      text: {
        fill: "#4d4f52",
        fontSize: "1.6rem"
      }
    },
    legend: {
      text: {
        fill: "#4d4f52",
        fontSize: "1.6rem",
        fontWeight: 550,
        fontFamily: "Helvetica"
      }
    }
  },
  labels: {
    text: {
      fontSize: "1.6rem",
      fontWeight: 550,
      fontFamily: "Helvetica",
      fill: "#4d4f52",
    }
  }
  // Grid Lines
  // grid: {
  //   line: {
  //     stroke: "#555555"
  //   }
  // }
};

// Creating class for Gender Chart so it can hold state and receive props
class LanguageChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      totalCount: 0,
      data: [],
      keys: ["English", "Swahili", "Kinyarwanda", "Luganda", "Lukiga"],
      color: "nivo",
      englishPercentage: 0,
      swahiliPercentage: 0,
      kinyarwandaPercentage: 0,
      lugandaPercentage: 0,
      lukigaPercentage: 0,
      englishCount: 0,
      swahiliCount: 0,
      kinyarwandaCount: 0,
      lugandaCount: 0,
      lukigaCount: 0,
    };
  }

  componentDidMount() {
    this.props.getDropDownDefault(this.props.pathname);

    axios
      .get("https://staging-sauti-labs-14.herokuapp.com/users/all/language/all")
      .then(res => {
        //console.log('totalCount', res.data.length)
        this.setState(
          {
            ...this.state,
            users: res.data,
            totalCount: res.data.length
          },
          () => {
            this.getLanguageEnglish();
          }
        );
      })
  }

  getLanguageEnglish = () => {
    axios
      .get("https://staging-sauti-labs-14.herokuapp.com/users/all/language/english/count")
      .then(res => {
        console.log("english res count", res.data);
        this.setState({
          ...this.state,
          englishCount: res.data
        },
        () => {
          this.getLanguageSwahili();
        }
        );
        console.log(this.state.EnglishCount);
      })
      .catch(err => {
        console.log(err);
      });
  };
  getLanguageSwahili = () => {
    axios
      .get("https://staging-sauti-labs-14.herokuapp.com/users/all/language/swahili/count")
      .then(res => {
        console.log("Swahili res count", res.data);
        this.setState({
          ...this.state,
          swahiliCount: res.data
        },
        () => {
          this.getLanguageKinyarwanda();
        }
        );
        console.log(this.state.swahiliCount);
      })
      .catch(err => {
        console.log(err);
      });
  };

  getLanguageKinyarwanda = () => {
    axios
      .get("https://staging-sauti-labs-14.herokuapp.com/users/all/language/kinya/count")
      .then(res => {
        this.setState({
          ...this.state,
          kinyarwandaCount: res.data
        }, () => {
          this.getLanguageLuganda();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  getLanguageLuganda = () => {
    axios
      .get("https://staging-sauti-labs-14.herokuapp.com/users/all/language/luganda/count")
      .then(res => {
        this.setState({
          ...this.state,
          lugandaCount: res.data
        }, () => {
          this.getLanguageLukiga();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  getLanguageLukiga = () => {
    axios
      .get("https://staging-sauti-labs-14.herokuapp.com/users/all/language/lukiga/count")
      .then(res => {
        this.setState({
          ...this.state,
          lukigaCount: res.data
        }, () => {
          this.setPercentages();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  
  setPercentages = () => {
    const totalCount = this.state.totalCount;
    // let totalCount = dailyCount + weeklyCount + monthlyCount + neverCount;
    let englishPercentage = Math.round((this.state.englishCount / totalCount) * 100);
    let swahiliPercentage = Math.round((this.state.swahiliCount / totalCount) * 100);
    let kinyarwandaPercentage = Math.round((this.state.kinyarwandaCount / totalCount) * 100);
    let lugandaPercentage = Math.round((this.state.lugandaCount / totalCount) * 100);
    let lukigaPercentage = ((this.state.lukigaCount / totalCount) * 100).toFixed(1);
    this.setState(
      {
        ...this.state,
        englishPercentage: englishPercentage,
        swahiliPercentage: swahiliPercentage,
        kinyarwandaPercentage: kinyarwandaPercentage,
        lugandaPercentage: lugandaPercentage,
        lukigaPercentage: lukigaPercentage
      },
      () => {
         this.setState({
          ...this.state,
          data: [
            {
              Language: "English",
              English: this.state.englishPercentage,
              EnglishColor: "hsl(65, 70%, 50%)"
            },
            {
              Language: "Swahili",
              Swahili: this.state.swahiliPercentage,
              SwahiliColor: "hsl(65, 70%, 50%)"
            },
            {
              Language: "Kinyarwanda",
              Kinyarwanda: this.state.kinyarwandaPercentage,
              SwahiliColor: "hsl(65, 70%, 50%)"
            },
            {
              Language: "Luganda",
              Luganda: this.state.lugandaPercentage,
              LugandaColor: "hsl(65, 70%, 50%)"
            },
            {
              Language: "Lukiga",
              Lukiga: this.state.lukigaPercentage,
              LukigaColor: "hsl(65, 70%, 50%)"
            },
          ]
        });
      }
    );
  };

  render() {
    return (
      <div className="Chart">
        <h2>Language</h2>
        <ResponsiveBar
          data={this.state.data} // Data needed
          keys={this.state.keys} // Values to display in Y axis
          indexBy="Language"
          margin={{ top: 50, right: 130, bottom: 60, left: 60 }}
          padding={0.3}
          groupMode="stacked"
          colors={{ scheme: this.state.color }}
          labelFormat= {d => <tspan y={ -15 }>{d}% </tspan>}
          labelForm= {d => <text >{d}% </text>}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          maxValue={100}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Language",
            legendPosition: "middle",
            legendOffset: 50
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Percentage of Traders",
            legendPosition: "middle",
            legendOffset: -50
          }}
          labelSkipWidth={0}
          labelSkipHeight={0}
          labelTextColor="black"
          theme={theme}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
        <div className="lineCont">
        <div className="lineOne">
        <h2 className="method-title">Methodology Note</h2>
        </div>
        <div className="lineTwo"></div>
        </div>
        <p>
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
        </p>
      </div>
    );
  }
}

export default LanguageChart;