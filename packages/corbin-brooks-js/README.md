# Corbin & Brooks - Software Developer Assessment 2022
​
Dear candidate,
​
Welcome to our Software Development Assessment Test. Please read the following information carefully as well as all the questions before moving on to solving any of them.
​
### Considerations:

- Using a markdown plugin or tool makes this document look better.
- You are free to use any environment you feel most comfortable with.
- You are free to google anything.
- You can use this sandbox https://codesandbox.io/s/new or a local environment if preferred  

Ok, here we go:  
Please create a new react app and solve the following statements:  
Using the following array:

```javascript
  [
    {
      name: "Albert",
      last_name: "Einstein",
      timeout: 10
    },
    {
      name: "Elon",
      last_name: "Musk",
      timeout: 15
    },
    {
      name: "Erwin",
      last_name: "Schrödinger",
      timeout: 12
    },
    {
      name: "Isaac",
      last_name: "Newton",
      timeout: 18
    },
    {
      name: "Nikola",
      last_name: "Tesla",
      timeout: 20
    },
    {
      name: "Marie",
      last_name: "Curie",
      timeout: 14
    },
    {
      name: "Werner",
      last_name: "Heisenberg",
      timeout: 16
    },
    {
      name: "Niels",
      last_name: "Bohr",
      timeout: 19
    },
    {
      name: "Robert",
      last_name: "Oppenheimer",
      timeout: 20
    },
  ];
```
1. Sort the list by last name in a descending order and filter every third name out of the list.
2. Use the names you filtered out on the previous question and show each one of them on the screen for the amount of seconds specified in the timeout attribute.

Example:
```javascript
  [
    {
      name: "Robert",
      last_name: "Oppenheimer",
      timeout: 20
    },
    {
      name: "Werner",
      last_name: "Heisenberg",
      timeout: 16
    },
    {
      name: "Niels",
      last_name: "Bohr",
      timeout: 19
    },
  ];
```
In this case the name Robert Oppenheimer should be on the screen for 10 seconds and disappear, then show Werner Heisenberg for 18 seconds, disappear and then Niels Bohr for 20 seconds, disappear and then repeat.

3. Calculate the Fibonnaci number of N efficiently using a recursive function. The Fibonacci Sequence is a set of numbers such that each number in the sequence is the sum of the two numbers that immediatly preceed it.

I.E:
```
The fibonacci number of 0 = 0
The fibonacci number of 1 = 1
The fibonacci number of 2 = 1
The fibonnaci number of 3 = 2
The fibonnaci number of 4 = 3
The fibonnaci number of 5 = 5
The fibonnaci number of 6 = 8
```
Expected Time Complexity = O(N)
