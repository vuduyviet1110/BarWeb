import beverage1 from "./assets/images/beverage1.jpg";
import beverage2 from "./assets/images/beverage2.jpg";
import beverage3 from "./assets/images/beverage3.jpg";
import beverage4 from "./assets/images/beverage4.jpg";
import beverage5 from "./assets/images/beverage5.jpg";
import beverage6 from "./assets/images/beverage6.jpg";
import beverage7 from "./assets/images/beverage7.jpg";
import barAva from "./assets/images/Barava.jpg";
export const Contents = [
  {
    HomePage: {
      Heading: "fasdf",
      Descriptions: "",
      HomeImage: { barAva },
    },
  },
  {
    OurStory: {
      title: "",
      description: "",
      BackgroundImage: {},
      SideImage: {},
    },
  },
  {
    Beverage: {
      Cocktails: [
        {
          id: "1",
          name: "cock1",
          des: "cokc1 luôn",
          price: 10,
          photo: { beverage1 },
        },
        { name: "cock2", des: "cokc2 luôn", price: 20, photo: { beverage2 } },
        { name: "cock3", des: "cokc3 luôn", price: 30, photo: { beverage3 } },
        { name: "cock4", des: "cokc4 luôn", price: 40, photo: { beverage4 } },
        { name: "cock5", des: "cokc5 luôn", price: 50, photo: { beverage5 } },
        { name: "cock1", des: "cokc1 luôn", price: 10, photo: { beverage6 } },
      ],
      Beers: [
        { name: "cock2", des: "cokc2 luôn", price: 20, photo: { beverage2 } },
        { name: "cock3", des: "cokc3 luôn", price: 30, photo: { beverage5 } },
        { name: "cock4", des: "cokc4 luôn", price: 40, photo: { beverage7 } },
        { name: "cock5", des: "cokc5 luôn", price: 50, photo: { beverage1 } },
      ],
      SodaNMinerals: [
        { name: "cock1", des: "cokc1 luôn", price: 10, photo: { beverage6 } },
        { name: "cock2", des: "cokc2 luôn", price: 20, photo: { beverage4 } },
        { name: "cock3", des: "cokc3 luôn", price: 30, photo: { beverage2 } },
      ],
      all: [],
    },
  },
  {
    Gallery: [
      beverage1,
      beverage2,
      beverage3,
      beverage4,
      beverage5,
      beverage6,
      beverage7,
      beverage1,
    ],
  },
];

export const reservations = [
  {
    id: "1",
    name: "user1",
    phoneNo: "134578654",
    email: "a@agmail.com",
    time: new Date(2025, 1, 1),
    NoPpl: 2,
    DOB: new Date(2000, 4, 6),
  },
  {
    id: "2",
    name: "user2",
    phoneNo: "134578654",
    email: "a@agmail.com",
    time: new Date(2025, 1, 1),
    NoPpl: 2,
    DOB: new Date(2000, 4, 6),
  },
  {
    id: "3",
    name: "user3",
    phoneNo: "134578654",
    email: "a@agmail.com",
    time: new Date(2025, 1, 1),
    NoPpl: 2,
    DOB: new Date(2000, 4, 6),
  },
  {
    id: "4",
    name: "user4",
    phoneNo: "134578654",
    email: "a@agmail.com",
    time: new Date(2025, 1, 1),
    NoPpl: 2,
    DOB: new Date(2000, 4, 6),
  },
];
