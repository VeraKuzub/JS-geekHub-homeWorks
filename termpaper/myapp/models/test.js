let arr = [];                                
for(let i = 0; i<10; i++) {                  
    let fn = function() { return i };
        
    arr.push(fn);  
    console.log(arr);                       
}                                            
// let x = arr[5]();
let y = arr[3]();