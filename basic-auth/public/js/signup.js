// // TEST TO COMPARE ELEMENTS (this case are dates)
// window.onload = function () {
//   document.getElementById("form1").onsubmit = function () {
//     var name1 = document.getElementById("name1");
//     var name2 = document.getElementById("name2");
//     var date1 = document.getElementById("date1");
//     var date2 = document.getElementById("date2");
//     if ((new Date(date1.value)).getTime() < (new Date(date2.value)).getTime()){
//       console.log(name1.value + " is greater than " + name2.value)}
//     else if ((new Date(date1.value)).getTime() > (new Date(date2.value)).getTime()){
//       console.log(name2.value + " is greater than " + name1.value)}
//     else{
//       console.log(name2.value + " and " + name1.value + " are of same age.")};
//   };
// };

// //this would go on the .hbs file
// <form id="form1">
//   Full name of first person: <input type="text" id="name1"></input><br></br>
//   Birthday: <input type="date" id="date1"></input><br></br>
//   <br></br>
//   Full name of second person: <input type="text" id="name2"></input><br></br>
//   Birthday: <input type="date" id="date2"></input><br></br>
//   <input type="submit" value="Check"></input>
// </form>;

////
////
////
