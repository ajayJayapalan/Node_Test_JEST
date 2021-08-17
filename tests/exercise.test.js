const fizz = require("../exercise");

describe("fizzBuzz", () => {
  it("show throw an exception if input is not a number", () => {
    const types = ["str", {}, () => {}, true, undefined, null];

    types.forEach((i) => {
      expect(() => {
        fizz.fizzBuzz(i);
      }).toThrowError();
    });
  });

  it("show return 'FizzBuzz' if input is divisible by 3 & 5", () => {
    const result = fizz.fizzBuzz(15);
    expect(result).toBe("FizzBuzz");
  });

  it("show return 'Fizz' if input is divisible by 3 Only", () => {
    const result = fizz.fizzBuzz(3);
    expect(result).toBe("Fizz");
  });

  it("show return 'Buzz' if input is divisible by 5 Only", () => {
    const result = fizz.fizzBuzz(5);
    expect(result).toBe("Buzz");
  });

  it("show return 'number' if input is not divisible by 3 or 5", () => {
    const number = 7;
    const result = fizz.fizzBuzz(number);
    expect(result).toBe(number);
  });
});
