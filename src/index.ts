// console.log('Hello World')


// Question 3:
// A debounced function postpones its execution by t milliseconds each time it is invoked.
// If called again during this interval, the previous invocation is discarded.

// user typ M
// do timer that after t MS will call the function.
// user typ I, check if previous timer didnt finish, if so reset the t MS. if not, also reset the t MS.

//
// function debounce(func, t) {
//     // Implement your debounce function here
//     // const check = setInterval()
//     if (timeoutPoint) {
//
//     }
//     const timeoutPoint = setTimeout(func, t)
//     // clearInterval()
//     // intervalPointer.
// }

const debounce = (mainFunction, delay) => {
    // Declare a variable called 'timer' to store the timer ID
    let timer;

    // Return an anonymous function that takes in any number of arguments
    return function (...args) {
        // Clear the previous timer to prevent the execution of 'mainFunction'
        clearTimeout(timer);

        // Set a new timer that will execute 'mainFunction' after the specified delay
        timer = setTimeout(() => {
            mainFunction(...args);
        }, delay);
    };
};


debounce(console.log, 10)(3333)
debounce(console.log, 10)(3333)
