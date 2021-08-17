const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");

// Testing Number
describe("absolute", () => {
  it("should return a positive number if input is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it("should return a positive number if input is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it("should return zero if input is zero", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

// Testing String
describe("absolute", () => {
  it("should return the greeting message", () => {
    const name = "Mosh";
    const result = lib.greet("Mosh");
    //expect(result).toBe('Welcome mosh'); // too specific
    expect(result).toMatch(/Mosh/);
    expect(result).toContain("Mosh");

    //or
    const regExp = new RegExp(name);
    expect(result).toMatch(regExp);
  });
});

// Testing Array
describe("getCurrencies", () => {
  it("should return supported currencies", () => {
    const result = lib.getCurrencies();
    expect(result).toEqual(expect.arrayContaining(["EUR", "AUD", "USD"]));
  });
});

//Testing Object
describe("getProduct", () => {
  it("should return product with the given id", () => {
    const result = lib.getProduct(1);
    expect(result).toMatchObject({ id: 1, price: 10 });
    expect(result).toHaveProperty("id", 1);
  });
});

// Testing Exception
describe("registerUser", () => {
  it("should throw an exception if input username is falsy", () => {
    const args = [null, undefined, "", false, 0, NaN];
    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a);
      }).toThrowError();
    });
  });

  it("should return user object if username is valid", () => {
    const username = "hoadewuyi";
    const result = lib.registerUser(username);
    expect(result.id).toBeTruthy();
    expect(result).toHaveProperty("username", username);
  });
});

// Mock Function
describe("applyDiscount", () => {
  it("should apply 10% discount if customer has more than 10 points", () => {
    db.getCustomerSync = function (customerId) {
      console.log("Fake reading customer...");
      return { id: customerId, points: 11 };
    };

    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

// Mock Function - Interaction testing
describe("notifyCustomer", () => {
  it("should send an email to the customer", () => {
    db.getCustomerSync = function (customerId) {
      return { email: "a" };
    };
    let mailSent = false;
    mail.send = function (email, message) {
      mailSent = true;
    };
    lib.notifyCustomer({ customerId: 1 });

    expect(mailSent).toBe(true);
  });
});
