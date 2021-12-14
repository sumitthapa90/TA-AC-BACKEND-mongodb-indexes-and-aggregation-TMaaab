writeCode

Insert the data present in users.json into local mongodb database using `mongoimport` into a database called sample and collection named as users.

Write aggregation queries to perform following tasks.

1. Find all users who are active.

db.Users.aggregate([{$match: {isActive: true}}]).pretty()

2. Find all users whose name includes `blake` case insensitive.

db.Users.aggregate([{$match: {$text: {$search: "blake"}}}]).pretty()

3. Find all males.

db.Users.aggregate([ {$match: {gender:'male'}} ]).pretty()

4. Find all active males.

db.Users.aggregate([ {$match: {gender:'male'}} ]).pretty()

5. Find all active females whose age is >= 25.

db.Users.aggregate([ {$match: {gender:'female',age:{$gte:25}}}]).pretty()

6. Find all 40+ males with green eyecolor.

db.Users.aggregate([{$match: {gender: "male", eyeColor: "green"}}]).pretty()

7. Find all blue eyed men working in 'USA'.

db.Users.aggregate([{$match: {gender: "male", eyeColor: "blue", "company.location.country": "USA" }}]).pretty()

8. Find all female working in Germany with green eyes and apple as favoriteFruit.

db.Users.aggregate([{$match : {gender: "female", "company.location.country": "Germany", eyeColor: "green", favoriteFruit: "apple"}}]).pretty()

9. Count total male and females.

db.Users.aggregate([{$group: {_id: "$gender", count: {$sum: 1} }}]).pretty()

10. Count all whose eyeColor is green.

db.Users.aggregate([{$match : {eyeColor: "green"}}, {$group: {_id: "$eyeColor", count: {$sum: 1}}}]).pretty()

11. Count all 20+ females who have brown eyes.

db.Users.aggregate([{$match : {gender: "female" , eyeColor: "brown", age: {$gte: 20}}}, {$group: {_id: "$gender", count: {$sum: 1}}}]).pretty()

12. Count all occurences of all eyeColors.
    Something like:-

```
blue -> 30
brown -> 67
green -> 123
```

db.Users.aggregate([{$group: {_id: "$eyeColor", count: {$sum: 1}}}]).pretty()

13. Count all females whose tags array include `amet` in it.

db.Users.aggregate([{$match : {gender: "female", tags: "amet"}}, {$group : {_id: "$gender", count: {$sum: 1}} }])

14. Find the average age of entire collection

db.Users.aggregate([{$group : {_id: null, avg_age: {$avg: "$age"}}}]). pretty()

15. Find the average age of males and females i.e. group them by gender.

db.Users.aggregate([{$group : {_id: "$gender", avg_age: {$avg: "$age"}}}]).pretty()

16. Find the user with maximum age.

db.Users.aggregate([{$group : {_id: null , max_age: {$max: "$age"}}}]).pretty()

17. Find the document with minimum age.

db.Users.aggregate([{ $group: { _id: null, min_age: { $min: '$age' } } }]);

18. Find the sum of ages of all males and females.

db.Users.aggregate([{ $group: { _id: '$gender', total_Age: { $sum: '$age' } } }]);

19. Group all males by their eyeColor.
    db.Users.aggregate([
    { $match: { gender: 'male' } },
    { $group: { _id: '$eyeColor', count: { $sum: 1 } } },
    ]);

20. group all 30+ females by their age.

db.Users.aggregate([
{ $match: { gender: 'female', age: { $gt: 30 } } },
{ $group: { _id: '$age', count: { $sum: 1 } } },
]);

21. Group all 23+ males with blue eyes working in Germany.

    db.Users.aggregate([
    { $match: { gender: 'male', age: { $gt: 23 }, 'company.location.country': 'Germany' } },
    { $group: { _id: '$age', count: { $sum: 1 } } },
    ]);

22. Group all by tag names i.e. use \$unwind since tags are array.

db.Users.aggregate([
{ $unwind: '$tags' },
{ $group: { _id: '$tags', count: { $sum: 1} } }
]);

23. Group all males whose favoriteFruit is `banana` who have registered before 2015.

db.Users.aggregate([
{ $match: { gender: 'male', favoriteFruit: 'banana', registered: { $lte: ISODate("2015-07-05T12:16:05Z")} } },
{ $group: { _id: null, count: { $sum: 1 } } },
]);

24. Group all females by their favoriteFruit.

db.Users.aggregate([
{ $match: { gender: 'female' } },
{ $group: { _id:'$favoriteFruit', count: { $sum: 1 } } },
]);

25. Scan all the document to retrieve all eyeColors(use db.COLLECTION_NAME.distinct);

db.Users.distinct('eyeColor');

26. Find all apple loving blue eyed female working in 'USA'. Sort them by their registration date in descending order.

db.Users.aggregate([
{ $match: { gender: 'female', favoriteFruit: 'apple', 'company.location.country': 'USA' } },
{ $sort: { registered: -1 } },
]).pretty();

27. Find all 18+ inactive men and return only the fields specified below in the below provided format

```js
{
  name: "",
  email: '';
  identity: {
    eye: '',
    phone: '',
    location: ''
  }
}
```

db.Users.aggregate([
{ $match: { gender: 'male', isActive: false, age: { $gt: 18} } },
{ $project: {
name: 1,
email: '$company.email',
identity: {
eye: '$eyeColor',
phone: '$company.phone',
location: '$comapny.location'
}
}
},
]).pretty();
