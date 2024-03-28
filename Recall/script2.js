
// let json ;
let word ;
let definition;
let wordList = [];
let indexs = [];

// async function fetchWord(){
//   try{
//     const data = await fetch("https://random-word-api.herokuapp.com/all");
//     if(data.status===200){
//       json = await data.json();
//     }else{ 
//       throw new Error("something failed...")
//     }
//   }catch(err){
//     console.log(err.message);
//   }  
// }

async function fetchDefinition(word1){
    try{
      const data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word1}`);
      
      if(data.status===200){
        let definition1 = await data.json();
        // const data1 = definition[0].meanings[0].definitions[0].definition;
          //  console.log(word1,definition1[0].meanings[0].definitions[0].definition)
        return definition1[0].meanings[0].definitions[0].definition;
      }else{ 
        throw new Error("something failed...")
      }
    }catch(err){
    //  showNewWord();
      console.log(err.message);
    }  
  }

async function generateRandomWord(){
    let random = simpleWordList.length;
    let randomNumber = Math.round(Math.random()*(0+random-1));
    let word1 = simpleWordList[randomNumber];
    // console.log(word1)
    let definition2 = await fetchDefinition(word1)
    // console.log(word1,definition2);
    return {
      id:randomNumber,
      word:word1,
      definition:definition2,
    }
    
}


async function getWord(){
  for(let i=0;wordList.length<25;i++){
    // console.log("hi1",wordList.length)
    let obj = await generateRandomWord();
    // console.log(obj)
       if(!indexs.includes(obj.id))
          wordList.push(obj);
          indexs.push(obj.id)
          // console.log(obj)
     
    // }).catch(er=>{console.log(er)});

    // wordList.push("1");
    // console.log("length is ",wordList.length)
  }
  console.log(wordList)
}



// getWord();

// generateRandomWord();
// fetchDefinition(word);

// console.log(word,definition);
// definition = data1[0].meanings[0].definitions[0].definition;