let vendors = [
  {
    name: "Vendor1",
    products: [
      { Name: "Mobile", Price: 15000 },
      { Name: "Printer", Price: 5000 },
      { Name: "Tv", Price: 25000 },
    ],
  },
  {
    name: "Vendor2",
    products: [
      { Name: "Mobile", Price: 15000 },
      { Name: "Printer", Price: 4000 },
      { Name: "Tv", Price: 26000 },
    ],
  },
  {
    name: "Vendor3",
    products: [
      { Name: "Mobile", Price: 14000 },
      { Name: "Printer", Price: 5000 },
      { Name: "Tv", Price: 27000 },
    ],
  },
];

async function getOrder(req, res) {
  //array of objects
  //   console.log(req);
  console.log(req.body.products);

  const product = req.body.products;
  // {Name: ,Quantity:}
  let quotation;
  try {
    quotation = await createVendor(product);
    console.log("heloooooo");

    res.status(200).send({
      status: "success",
      Qoute: quotation,
    });
  } catch (e) {
    res.status(400).send({ status: "Error", msg: e });
  }
}
let final_vendor = [];
// [
// {ID: ,
// details : [ {Name : , Vendor:{}}, {} ], State}
// ]
// = [{ Id: { Name: "Mobile", Vendor: {}, state: "pending" } }];
let id = 1;
async function createVendor(products) {
  let quote = 0;

  try {
    //object array of product name and vendor
    let temp_arr = [];
    for (let i = 0; i < products.length; i++) {
      let seller;
      let min = Number.MAX_VALUE;
      for (let v of vendors) {
        //vendor list
        for (let p of v.products) {
          //each vendor products
          if (p.Name === products[i].Name && p.Price < min) {
            seller = v;
            min = p.Price;
          }
        }
      }
      temp_arr.push({ Name: products[i].Name, Vendor: seller });
      final_vendor.push({
        Id: id,
        Details: temp_arr,
        State: "Pending",
      });
      id++;
      quote = quote + min * products[i].Quantity;
    }
    console.log(quote);
    return quote;
  } catch (e) {
    console.log(e);
  }
}

async function viewVendor(req, res, Id) {
  try {
    let det;
    console.log(Id);
    for (let v of final_vendor) {
      if (v.Id == Id) {
        det = v;
        break;
      }
      //   console.log(v);
    }
    res.status(200).send({ status: "Success", Details: det });
    // res.send("Not found");
  } catch (e) {
    res.status(400).send({ status: "Error", msg: e });
  }
}

async function commitOrder(req, res, Id) {
  try {
    let det;
    console.log(Id);
    for (let v of final_vendor) {
      if (v.Id == Id) {
        v.State = "Committed";
        det = v;
        //   console.log(v);}
      }
    }
    res.status(200).send({ status: "Success", Details: det });
    // res.send("Not found");
  } catch (e) {
    res.status(400).send({ status: "Error", msg: e });
  }
}

module.exports = { getOrder, viewVendor, commitOrder };
