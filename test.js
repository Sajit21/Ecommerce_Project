const myProm = new Promise((resolve,reject)=> {
    setTimeout(() => {
        resolve("Hello from myProm1"); 
     },3000);
});
const myProm2 = new Promise((resolve,reject)=>{
    setTimeout(() => {
       resolve("Hello from myProm2"); 
    },5000);
});

async function hello()
{
    console.log(await myProm2);
    console.log('hello')
}
async function hello1()
{
    console.log(await myProm);
}
hello();
hello1();