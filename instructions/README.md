# Lab 2B - JavaScript Part 2

### Overview

Now that we've learned some of the basics of JavaScript, it's time to use it to do some more complicated things. We will use Higher-Order Functions to sort tasks by date and hide completed tasks.

We'll also be using JavaScript to help prevent against Cross-Site-Scripting attacks and store the current form state in local storage. 

### Functionality

- Sort and filter data using Higher-Order Functions
- Prevent Cross-Site-Scripting attacks
- Clean up the styles
- Visually display that a task has been completed
- Store current state in a persistent store

### Concepts

- [Asynchronous Coding Practices](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff)
- [Higher Order Functions](https://dev.to/damcosset/higher-order-functions-in-javascript-4j8b)
- [Cross-Site-Scripting Attacks](https://portswigger.net/web-security/cross-site-scripting/dom-based)
- Live Form Data Capture

### Technologies

- JavaScript Date Object
- Browser Storage

### UML Diagrams

Just like in lab 2a, you will need to create a UML diagram. For this lab, your UML diagram will represent the functionalities of sorting your tasks in your task list. This UML diagram will also be an activity diagram. 
- Here, again, is the link to the activity diagram documentation: [Activity Diagram Documentation](https://www.lucidchart.com/pages/uml-activity-diagram) 
- Here is a simple example of an activity diagram from the documentation: [Activity Diagram Example](https://d2slcw3kip6qmk.cloudfront.net/marketing/pages/chart/activity-diagram-for-banking-system-UML/activity-diagram-for-banking-system-UML-650x665.png)

## Step 1: Handle Timestamps in data and sorting

By default, our data is just sorted by which tasks were added first, which doubles as the time it was added. However, sometimes you might add a task that needs to be completed before a task that you already created. In that case, it would be very useful to sort the tasks by the date that they are due. To achieve this, we will sort the tasks array by the date property in our data.

1. Add a button (or switch) with an event listener that, when clicked, toggles between sorting your tasks by the due date, and sorting them back to the original order, the time added. You may **NOT** modify the original `tasks` array or the local storage when you sort. The original **must** remain unchanged. (Hint: Make a duplicate, then use JavaScript's built-in array function `sort()` on it.)

## Step 2: Filter out completed tasks

When we check off a task, it stays exactly where it is. Let's add functionality to hide completed tasks.

Add another button (or switch) with another event listener that, when clicked, toggles the display of completed tasks. Again, make sure the original `tasks` array isn't modified.

## Step 3: Prevent Cross-Site-Scripting attacks

There are a few different kinds of Cross-Site Scripting (XSS) attacks. It is important to know of them so you can prevent your website from being attacked in such a way. The following table explains the different kinds briefly:

| Name      | Definition                                                                |
| --------- | ------------------------------------------------------------------------- |
| Reflected | The malicious script comes from the current HTTP request                  |
| Stored    | The malicious script comes from the server's database                     |
| DOM-based | The vulnerability exists in client-side code rather than server-side code |

We're concerned mainly with the last of these, the DOM-based attack. This is where a malicious user takes advantage of a text box that posts to the website, much like what we're doing here.

There are many ways a malicious user could do this, but they almost always include writing code into the text box before submitting it. Browsers, by default, eliminate the possibility of simply submitting a `<script>` tag. Those won't work. However, if someone were to post the following as the text to a task:

```HTML
<img src=1 onerror="alert(`you've been hacked!`)" />
```

you will find that it indeed alerts the message.

1. Read about XSS attacks in the article linked above in the "Concepts" section

2. Use Google to find a way to prevent this sort of attack. Make the text appear as it was inserted, though. For example, if you add a task with the text `'I <3 my TAs!'`, it should show up in the task list the same way.

## Step 4: Store the current state in local storage

As a user, at some point, while writing a task, the page may freeze, or you accidentally refresh the page and lose everything you were working on. One way to recover from this is to set up a live capture of all of the form data in your code.

1. Add code that stores the current values of your form in local storage. The data must be captured when a user types any text or selects a date. (Hint: You will use an event listener that uses the `oninput` event to accomplish this.)

1. Make sure when you hard-refresh (<kbd>Ctrl-Shift-r</kbd> / <kbd>Cmd-Shift-r</kbd>) the page that you get the data from local storage to actually show up in the form, both text and date!

1. Add code that clears the form when a task is submitted. You can test this by making a new task, then immediately refreshing the page; your old form data should not reappear.

## Tips

1. More XSS

    The TAs are liable to use any trick up their sleeves to try and Cross-Site Script your page, but here's another you can try to see if your code successfully sanitizes your data:

    ```HTML
    <<em><strong>Hacked?</strong></em>
    ```

    > Note: The extra `<` is intentional.

## Syntactic Sugar

**WARNING**: heavily-opinionated section!

This:

```JavaScript
toggleSort() {
  currentlySorting = !currentlySorting
  /* ... */
}

/* ... */

if (currentlySorting) {
  /* ... */
}
```

is better than this:

```JavaScript
toggleSort() {
  currentlySorting += 1
  /* ... */
}

/* ... */

if (currentlySorting % 2 === 0) {
  /* ... */
}
```

# Passoff Requirements

- [ ] 5 Points - Choose appropriate permissions for all the files on your live server (you must explain why – 777 is not appropriate)
- [ ] 5 Points - UML diagram
- [ ] 5 Points - Code is backed up on GitHub
- [ ] 20 Points - Site is running on live server
- [ ] 10 Points - Tasks can be sorted by date
- [ ] 5 Points - Tasks can be sorted by time added
- [ ] 10 Points - Tasks can be filtered if done
- [ ] 10 Points - Tasks can be filtered if done and sorted by the date at the same time
- [ ] 5 Points - Original list isn't modified
- [ ] 5 Points - All local storage form data is rendered when the page loads
- [ ] 5 Points - Website sufficiently prevents XSS attacks
- [ ] 5 Points - Data is sorted/filtered using Higher-Order Functions
- [ ] 5 Points - When a task is marked "done", the text reflects that status in some way (strikethrough, dimmed, etc)
- [ ] 5 Points - JSON containing current form data is stored in local storage so the form values are not reset on page refresh. 

## UML Diagram
- [ ] UML Diagram in digital from, showing functionality of sorting tasks

# Extra Credit

> Note: TAs cannot help you with extra credit!

- [ ] 10 Points - Use an external JavaScript Library in an interesting and useful way
- [ ] 5 Points - Get the sorting and filtering to stay after a page refresh
- [ ] 5 Points - Get the date to default to today's date

# Writeup Questions

- How did you protect your site against Cross-Site Scripting? Which type of Cross-Site Scripting did you protect against?
- What is a Higher-Order Function?
- What are the differences between the `oninput`, `onkeyup`, and `onchange` events? When do they trigger, when might you use one over the others?
