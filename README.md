# JavaScript Event Loop Visualizer

This project is a JavaScript Event Loop Visualizer that helps understand how the JavaScript event loop, call stack, and asynchronous operations work. The visualizer allows you to input JavaScript code and see how the different parts of the code are executed, including the movement of tasks from the callback queue to the call stack.

## Features

- Visualize the JavaScript call stack, heap, Web API, and callback queue.
- Display the state of variables in the heap.
- Show the execution of `setTimeout` and other asynchronous operations.
- Adjustable speed to see the event loop in action more clearly.
- Clear indication of when the event loop is running and handling tasks.

## Usage

1. **Input JavaScript Code**: Enter your JavaScript code in the provided text area.
2. **Execute Code**: Click the "Execute" button to run the code and visualize the execution.
3. **Adjust Speed**: Use the speed slider to adjust the execution speed for better visualization.

### Example Code

Here is an example code snippet you can use to see the visualizer in action:

```javascript
function main() {
  console.log("Main function start");

  function firstFunction() {
    console.log("First function start");
    let x = 10;
    let y = 20;
    setTimeout(() => {
      let z = x + y; // z = 30
      console.log("Timeout in first function executed with z:", z);
    }, 1000);
    console.log("First function end");
  }

  function secondFunction() {
    console.log("Second function start");
    let a = 5;
    let b = 15;
    setTimeout(() => {
      let c = a * b; // c = 75
      console.log("Timeout in second function executed with c:", c);
    }, 1500);
    console.log("Second function end");
  }

  firstFunction();
  secondFunction();

  console.log("Main function end");
}

main();
```

### How It Works
- **Call Stack:** Shows the sequence of function calls and their execution order.
- **Heap:** Displays the variables and their values.
- **Web API:** Shows the asynchronous operations, such as setTimeout.
- **Callback Queue:** Contains the callbacks waiting to be moved to the call stack.
- **Event Loop:** Moves tasks from the callback queue to the call stack.

### Video Demonstration
Watch the video demonstration to see how the JavaScript Event Loop Visualizer works: [Google Drive Video](https://drive.google.com/file/d/113qOzY8wxHe_ckgYUhh7MgKCYOC_st99/view)

### Installation
To run this project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/schulerj89/Javascript-Explained
cd js-explained
```
### Install dependencies:

```bash
npm install
```

### Start the development server:

```bash
npm start
```
Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the visualizer in action.

### Technologies Used
- React
- JavaScript
- CSS