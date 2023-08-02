# Turtle <img src="./logo.png" alt="Markdown Monster icon" style="float: left; margin-right: 10px; width: 60px; margin-top: -10px; border-radius: 20px;">

<br>
Turtle is a JavaScript based programming language written in TypeScript. It is syntactically similar to Lua. It doesn't have a useful purpose as it was created for fun. Turtle does not include file system and internet access making it safe for anyone to run. This programming language is relatively simple, only consisting of basic control flow and basic operators and functions. There is no memory management, including variables being deleted when they exit the scope they were defined in. Turtle checks and throws a lot of errors, but may ignore bad syntax leading to undefined behavior. Turtle also evaluates expressions by converting it to postfix notation and then evaluating it from there. This means that you can write your expressions in [infix notation](https://en.wikipedia.org/wiki/Infix_notation) and [postfix notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation), they will both work. For example, `5 + 5` and `5 5 +` will both return `10`. Turtle is a fairly slow language (making the name pretty fitting), and should not be used for projects that require fast performance. Finally, Turtle is in a very early stage, meaning it is very suspectable to bugs.

<hr>

## Table of Contents
- [Running Code](#running-code)
- [Control Flow](#control-flow)
- [User-Defined Functions](#user-defined-functions)
- [Arrays](#arrays)
- [Logical Keywords](#logical-keywords)
- [Dot Operator](#dot-operator)
- [Comments](#comments)
- [Functions](#functions)
- [Constants](#constants)

<hr>

## Running code
A script file is provided in this project. You can use that or make your own file. Then, run `node . {file}` or `yarn start {file}`.
You may also use the TL-SHELL by running `yarn run shell` or `npm run shell`.

## Control Flow
The main control flow keywords are:
- `if`
- `elif`
- `else`
- `while`
- `break`
- `continue`
- `end`

Here is an example script:
```lua
age = 16
if age >= 18
  print("You are an adult!")
else
  print("You are not an adult, you have " + (18 - age) + " years to go!")
end
```

Here is another example script using loops:
```lua
secretNumber = floor(random() * 10)

while true
  guess = number(prompt("Guess: "))
  if guess == secretNumber
    print("You chose correctly!")
    break
  else
    print("Incorrect, try again.")
  end
end
```

## User-Defined Functions
Turtle supports user-defined functions. Here is an example of using functions:
```lua
function add(a, b)
  return a + b
end

add(2, 3)
```

## Arrays
To index an array, you use the `->` operator.
```lua
array = [1, 2, 3, 4, 5]
array->2
```
To check if a value is in an array, you can use the `in` operator.
```lua
array = [1, 2, 3, 4, 5]
3 in array
```

You may also reassign values of an array
```lua
array = [1, 2, 3, 4, 5]
array->2 = 10
```

## Logical Keywords
Turtle uses words for logical operators. Turtle also has a `xor` operator which most languages do not. Here is an example using logical keywords:
```lua
function isLeapYear(year)
  return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)
end

isLeapYear(2023)
```

## Dot Operator
The dot operator calls a function with the left of the dot operator as the first argument. For example, the two function calls are identical:
```lua
arr = [1, 2, 3]
arr.push(4)
push(arr, 4)
```

## Comments
Comments in Turtle are marked with a `#`. Here is an example
```python
# Add two numbers
5 + 5 # Here we are using two fives.
```

## Functions
Here are all the functions that can be used:
- Stream functions:
    `print`, `prompt`
- Math functions:
    `sqrt`, `log`, `ln`, `toDegree`, `toRadians`, `sin`, `cos`, `tan`, `arcsin`, `arccos`, `arctan`,
    `round`, `floor`, `ceil`, `truncate`,
    `random`, `abs`,
    `factorial`, `mean`, `median`, `mode`, `combinations`, `permutations`,
    `max`, `min`

- Array functions:
    `push`, `slice`, `splice`, `pop`, `shift`, `join`, `length`, `indexOf`, `lastIndexOf`, `sort`

- String Functions:
    `substr`, `number`, `split`

- Other Functions:
    `type`, `error`

## Constants
As of now, there are only two constants. `PI` and `E`. `E` is Eulers number.