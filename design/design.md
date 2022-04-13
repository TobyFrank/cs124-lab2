Link to Tabbing through To-Do List Video: https://youtu.be/xVTE79Zm9os
<br>
Link to Screen Reader with To-Do List Video: https://youtu.be/56Y6Ai1Q_48

### 1. Design Decisions & Rationale
---

First Lab:

We decided to create a design inspired by a to-do binder. In this binder design, we have multiple folder tabs for users to click through where they can see “Incomplete” tasks, “Complete” tasks, and “All” tasks. The tasks themselves resemble a paper-style to-do list. At the bottom of the user’s list, they’ll see an option to delete all complete items. Finally, the user can add new tasks at the bottom of the screen.

We wanted to limit the number of hidden features on the screen to increase ease of use. This is why the user can initially see all task-filtering tabs, delete and edit options and the add new task option. We decided to place the add task button at the bottom for easy access on a mobile device. In our user testing, the features most frequently interacted with were the checkboxes and add task features. While the checkboxes were the only working feature—explaining their popularity—the add task button was not functional. We used this data to conclude that the add task button should be in the most accessible location. Furthermore, we realized that given too many tasks, the user would be unable to access the add feature button and task-filtering tabs without scrolling. Thus, we made the to-do list tab and the add new to-dos fixed or sticky so that a user could see them at all times. Finally, distinguishing between adjacent list items became difficult with long lists, so we added alternating background colors for visual clarity.

Second Lab:

For the second lab, we kept the fundamental ideas the same from our first lab. Most of the work we did was refining in actions and animations since we were now using JavaScript now for implementation. A few things we added: a module that pops up when you delete a task, moving completed tasks to the bottom (of the all tasks tab), and removing completed tasks from the incomplete tasks tab. Aesthetically, we changed the color scheme of the buttons to the folders and added a white background box to each of the tasks to make them more distinctive from one another. We also have a default message for when there are no tasks ("Start by adding a new task?"). As we were creating these features, we also thought through the experience of cancelling and creating tasks. We made it so that when you click the input part of "New Task" it empties automatically when you're typing in a new task (previously you'd have to first delete the "New Task" text to write your own text). However, if you just click add without writing your own text description, the text will be "New Task" (which we believe to be a good default text). Furthermore, we made the editing process more visually appealing and non-disruptive to the entire experience; it used to be a text box but now it's just an underline to indicate editing. When you click to edit another object, it will stop editing the previous one. Similarly, you can either click cancel or simply click outside the delete module to cancel your action. This pop-up module gives the user a warning and prevents the surprise that comes with accidentally clicking delete (rather than an action like completed/checked). Overall, we've done our best to create asmooth experience such that uers shouldn't be surprised by any actions. The only thing we'd like to implement but haven't been able to is an animation where when a task is completed, the task is crossed out in the incompleted tab then "moved" to the completed tab such that the sudden dissapearance of a task from incomplete tab is not surprisng to the user.
<br>

Third Lab:

For the third lab, we only had a small amount of changes. We improved the user experience of editing tasks from errors that popped up when switching to Firestore. For instance, we kept the experience of tasks moving (to their respective filter order) after a user finishes editing a task description, instead of the task moving while a user edits the task description (for example, if the filter is for alphabetical order the task should not move until a user is finished editing the task description). Furthermore, we added a filter button with a dropdown module on the top right corner where it's most accessible, and a priority flag button next to the create task and task description. In this way, users can change the filtering of tasks (from ascending to descending) and also change the priority level of a task by clicking the flag, which opens a dropdown where they can select from a yellow (low priority), orange (medium priority), or red flag (high priority). Furthermore, we changed the language of the default page (when a user has no tasks) to make more clear what the user should be doing (create a new task). We also increased padding between icon options for tasks because one of the feedbacks we received was that the icons were too close and that users may be afraid of tapping the wrong thing. Some small design details we implemented this lab include showing the selected flag with a light grey background when clicking a flag dropdown, allowing users to click enter in order to add a task or complete an action, and cohesively making it so that clicking off of a pop up would cancel the selection of any action. Furthermore, a small detail we implemented was making it so that the priority flag looked as though it were a part of the add task bar so that users could choose a priority level for the task before adding it. Overall, the design remains consistent and we added a ton of accessibility features such as labelling all of the buttons and focusable items so that their functions were more clear when using tabs or voice-over to navigate. We also made sure that when tabbing or using voice-over, if a pop-up module occured the tabbing ability would be limited to the pop-up.
<br>

Fourth Lab:

For the fourth lab, we had to implement a number of changes for the addition of subtasks. Some major changes include that after adding a task via the Add New Task bar at the bottom of the page, you add a task that has a "expand" button. Once you click that "expand" button you have the option to add a new subtask under this task. We indented these subtasks so it'd be easier to tell they were subtasks within a task. We also made it so that the priority flags were no longer dropdowns, based on a user interview. They noted that with a dropdown you'd always need two clicks, one click to open the dropdown and a second click to select a priority flag level. However, by just clicking through priority tasks at minimum you'd need one click to change from a low priority flag to a medium priority flag one, and two clicks to change from a low priority flag to a high priority flag at maximum. We also chose to only have one dropdown show at a time, meaning that when you open one the previously open one will close for simplicity (we don't want a user to have 5 task lists open at once).
<br>
Furthermore, we made a ton of changes for accessibility. We made sure that all elements that were interactable could be tabbed through (including our filter dropdown menu), and that all the relevant objects were reachable in a nice way for screen readers. We renamed many of our elements to improve our descriptions and to make sure visually impaired (VI) or blind users could understand what tasks they were on contextually, and what tools they were using for which task (for instance, if you're on an edit button it will also tell you for what task you're editing). Plus we made it so that when you delete a task and the pop-up shows up that a user can only tab or use the screen-reader within the pop-up to click "Cancel" or "OK" (with additional context for screen readers).

![To Do List Lab 4 Draft Image](To-Do-List-Lab4.jpg "To Do List Lab 4 Draft")
<br>


---

### 2. Alternative Designs

First Lab:

We had many ideas for our design. We started out with a simple to-do list app, with all the basic functionalities mentioned in the assignment. We had an add button in the top right and buttons with text like delete complete and show incomplete. We later shifted the button to the bottom right corner for easier tap access on a mobile phone for users. We also considered having only one edit button for users to edit multiple tasks. However, we thought that might be confusing in terms of usage so we removed it.

Second Lab:

We wanted to follow our original vision and thus did not change much. However, based on our user testing we did consider moving the "Delete All Completed Tasks" button to the top. This is something we will consider further in the future as well.

Third Lab:

We did not change much from our second lab. We essentially followed our original design idea, which was to have dropdowns for filtering and for flag priority selection. For prototyping purposes, we originally did not have a dropdown and just had three flags populate inline that users could choose from, but this would move our task text in an odd way and was less intuitive according to users when we conducted preliminary user testing.

Fourth Lab:

The main design alternative was keeping the flag dropdown bar. However, we decided to go with clicks to change flag priority, which is a cleaner design with less clicks after conducting user testing.


<br><br>
### 3. User Testing

First Lab:

We conducted user testing with a few of our friends and received extremely valuable feedback. We were able to catch a ton of small details that were confusing and improved the user experience. For one, one of our friends indicated that seeing the incomplete tasks was most important to him and that seeing all tasks was less important to him, especially if some of them were already completed. We incorporated this into our design by changing the order of the task-filtering tabs from [“All”, “Incomplete”, “Complete”] to [“Incomplete”, “Complete”, “All”]. We also increased the space between the edit and delete buttons to reduce the chance of misclicking at the suggestion of our test users. We observed the order in which our users visited each feature of the app, and noted that the user first looked at the task-filtering tabs, then the tasks themselves (focusing on the checkboxes and edit/delete buttons), before finally settling on the add new task button.

Second Lab:

We conducted user testing again, and again had extremely valuable feedback. We caught a lot of small things that were jarring to users that we changed, like the lack of a warning from clicking the delete button, and the surprise when you complete a task in incomplete that it disappears. Furthermore we found that small inconsistencies like different font styles and sizes when editing tasks text, and having a "Delete All Completed Tasks" button in incomplete task made no sense. We implemented all but two of these changes. One was creating an animation to give feedback to users that tasks were being completed. We believe that as long as the tasks are named differently it'll be more obvious to users that they've moved their completed tasks, but we want to create an animation in the future. In addition, one of our users suggested moving the "Delete All Completed Tasks" button to the top and creating an option to move tasks. We hope to potentially implement some of their suggestions in the future, but they agreed that they already really enjoyed the app experience more than the previous application (one of our users was the same from our first lab).

Third Lab:

We conducted even more user testing than usual this time around because of how useful it is. Our friends were really impressed by the intuitiveness of the application and the overall look (especially since they had either taken this class previously or tested an earlier version of our application). Some things they noticed were that they could click enter to complte actions and that they could click off modules in order to cancel actions. Some of the suggestions they had which we implemented incluced added an option for the filter to be ascending or descending, making clicking off the drop-downs a way to close them, and making editing tasks more intuitive by also implementing click off features. We also changed the filter icon that was more intuitive to them by having them pick between two icon options.

Fourth Lab:

Our users were incredible. They questioned every design choice (like the aforementioned priority flags) and walking through the logic behind subtasks: how they're ordered, what happens when they're crossed, and when they should appear in the completed tag to name a few. Overall they were really impressed (again) to see how far we've come since Lab 1.


<br><br>
### 4. Challenges you Faced

First Lab:

We faced many challenges. We had to navigate many challenges trying to get our top and footer to be sticky (or fixed), and we worked extensively on getting the correct spacing and appropriate font sizes. Getting the tabs to look like tabs was quite difficult as well because it required us to figure out how to maintain a single background with tabs on top. Furthermore, making sure that our entire list showed despite having sticky (or fixed) header and footers required testing our app to the limits with extremely long to-dos and ultimately required a lot of trial and error fixes. We also had to change our element types and styles to adjust for certain looks we were going for and conducting trial and error a ton.

Second Lab:

Many of our challenges came from JavaScript difficulties and forgetting to use arrow functions which caused technical difficulties. We also faced massive challenges trying to figure out an animation from moving tasks from incomplete to the other tabs to make the "clicking checkmark" experience for a task less jarring for users. Ultimately we couldn't figure it out and had to put this task on the backburner. More generally, we struggled with figuring out how to have a consistent background color (such that as a user scrolls there is no stop to the background color), and figuring out how to color the tabs to our liking since we are using a react tabs package that was not totally under our control.

Third Lab:

Per usual, we faced many challenges. We were extremely confused by the initial Firestore implementation since the lab instructions had not specified downloading the Cloud Firestore API (which helped us debug), and so we had to guess on some parts or figure out parts on our own. In addition, we had accidentally changed a variable name earlier on (changed from "name" to "text" to more accurately describe the variable) but had forgotten, which caused us a million issues of having to ensure we changed all variables and not catching it earlier since we had forgotten. Furthermore, we had trouble with editing parents and children for CSS purposes, and figuring out how to make things look the way we wanted to overall. We found ourselves having to go back to CSS documentation to figure out how to make things work. For instance, we had trouble making our dropdown box overlay our tabs, even though we had a higher z-index for the dropdown such that the layer should be above it.

Fourth Lab:

There were many features we wanted to implemented that we simply could not due to technical issues where we'd have to do a major overhaul of our code. For instance, we were so close to showing number of uncompleted subtasks over number of all subtasks for a task list. This was a user testing request and it was a challenge to the point that it was more important to ensure accessibility was working over cool features. Furthermore we had to restructure many flex and gridboxes due to the new sublists. Finally, we struggled with accessibility and correctly tabbing. Specifically, we had to ensure that our labels provided enough context to VI and blind users for them to know what tools they were using for what task (this was very important to us) and that navigating with tabs was intuitive.

<br><br>
### 4. Parts of the design you're most proud of

First Lab:

The part of the design we’re the proudest of is getting this to-do application to look like a folder. A lot of varying elements went into this, from rounding the edges of the buttons, to editing borders of specific sides to make the look of folder tabs consistent.

Second Lab:

The proudest part of our design is probably our pop up module. We pride ourselves in being able to get the pop-up module to work, but also that the rest of the page is dimmed and that a user can click outside of the module or use the cancel button in order to escape. Overall, we're really proud of our design consistency and the progress since the last lab.

Third Lab:

The part of the lab we're most proud of is our filter. Getting the dropdown in the correct placement, making the hover slightly gray, providing an ascending and descending option for users are all little bonuses in our book.

Fourth Lab:

The part of the lab we're most proud of is our accessibility labelling. We saw that our priority flags weren't labelled (which meant that users couldn't tell what priority flag they had and if it was low/med/high), and that check buttons, editing buttons, delete buttons, were labelled but didn't tell a user which task they were applying these changes to. We think this was a nuanced issue of not providing context and we're glad we made sure we addressed it.
