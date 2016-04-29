var students = [

{name:'jim', age:34, classes:['itc298', 'web150', 'cs110','cs142']},

{name:'sue', age:28, classes:['web150', 'web120']},

{name:'mary', age:32, classes:['web150', 'cs110', 'web120']},

{name:'dave', age:21, classes:['web150','cs110','itc298']}

];


function showDetails(student) {
console.log('\nStudent: ' + student.name +'\nAge: ' + student.age + '\nCourses: ' + student.classes.length);
}

students.forEach(showDetails);

/* This will put into an array all the students who are about 30
function findOlder(student) {
return student.age > 30;
}
var olderStudents = students.filter(findOlder);
console.log(olderStudents);
*/

/* This will display everything in the array
console.log(students); 
*/

/* This will find which students are under 30 (using findMillenial)
function findMillenial(student) {
return student.age < 30;
}
console.log(students.find(findMillenial)); 
*/

/* This will sort the students by age using byAgeAsc
var byAgeAsc = function(student1, student2) {
    // sorts students by age in ascending order
    return student1.age - student2.age;
}
console.log(students.sort(byAgeAsc)); 
*/

/* This will put the results of whatever you put into map(), into a new array
var progress = students.map(function(student) {
return {name : student.name, courses: student.classes.length}
});
console.log(progress);
*/