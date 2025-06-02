1 - create form and elements in html

2 - add simple css to help visualize

3 - create object for form validators

4 - create object for form elements

*******************

🧠 Goal:
Instead of stopping at the first failure, we want to:

Check all constraints

Collect every message where the rule fails

Return all those messages (probably as an array)

🔍 Think about this:
What kind of variable would you need to collect multiple messages?

Where would you add a message if a rule fails?

After the loop finishes, what would you return if:

There are failed messages?

There are none?

🛠 Hints for Implementation:
Start by creating an empty array before the loop.

During the loop, push messages into it when a test fails.

After the loop:

If the array has messages → return it

Otherwise → return null (everything passed)

