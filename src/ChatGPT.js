// import { StyleSheet, Text, View ,FlatList,TextInput, TouchableOpacity} from 'react-native'
// import React,{useState, useTransition} from 'react'
// import axios from 'axios';

// const apiKey='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';

// const ChatGPT = () => {
//     const [data,setData]=useState([]);
//     const apiUrl='https://api.openai.com/v1/engines/davinci-codex/completions';
//     const [textInput,setTextInput]=useState('');

//     const handleSend=async()=>{
//         const prompt=textInput
//         const response=await axios.post(apiUrl,{
//             prompt:prompt,
//             max_tokens:1024,
//             temperature:0.5,
//         },{
//             headers:{
//                 'Content-Type':'application/json',
//                 'Authorization':`Bearer ${apiKey}`
//             }
//         });
//         console.log(response);
//         const text=response.data.choices[0].text;
//         setData([...data,{type:'user','text':textInput},{type:'bot','text':text}]);
//         setTextInput('');
//     }
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>AI ChatBot</Text>
//       <FlatList
//         data={data}
//         keyExtractor={(item,index)=>index.toString()}
//         style={styles.body}
//         renderItem={({item})=>(
//             <View style={{flexDirection:'row',padding:10}}>
//                 <Text style={{fontWeight:'bold',color:item.type==='user'?'green':'red'}}>
//                     {item.type==="user" ? "AungKo " : 'Bot '}
//                 </Text>
//                 <Text style={styles.bot}>{item.text}</Text>
//             </View>
//         )}
//       />
//      <TextInput 
//         style={styles.input}
//         value={textInput}
//         onChangeText={text=>setTextInput(text)}
//         placeholder='Ask me anything'
//      /> 
//      <TouchableOpacity style={styles.button} onPress={handleSend}>
//         <Text style={styles.buttonText}>Let's Go</Text>
//      </TouchableOpacity>
//     </View>
//   )
// }

// export default ChatGPT

// const styles = StyleSheet.create({
//     container:{
//         flex:1,
//         alignItems:'center',
//         backgroundColor:'#fffcc9'
//     },
//     title:{
//         fontSize:28,
//         fontWeight:'bold',
//         marginTop:40
//     },
//     body:{
//         backgroundColor:'#fffcc9',
//         width:'102%',
//         margin:10
//     },
//     bot:{
//         fontSize:16,
//     },
//     button:{
//         backgroundColor:'yellow',
//         width:'90%',
//         height:60,
//         borderRadius:10,
//         justifyContent:'center',
//         alignItems:'center',
//         marginBottom:10
//     },
//     input:{
//         borderWidth:1,
//         borderColor:'black',
//         width:'90%',
//         height:60,
//         marginBottom:10,
//         borderRadius:10

//     },
//     buttonText:{
//         fontSize:25,
//         fontWeight:'bold',
//         color:'blue'
//     }
    
// })

// Chat GPT Code
import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList } from 'react-native';

const API_KEY = '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'; 

const ChatGPT = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleMessageSend = () => {
    if (inputText) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputText, sender: 'user' },
      ]);
      setInputText('');

    //   fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          prompt: inputText,
          max_tokens: 50,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: data.choices[0].text.trim(), sender: 'bot' },
          ]);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  const renderMessage = ({ item }) => (
    <Text style={{ color: item.sender === 'user' ? 'blue' : 'green' }}>
      {item.text}
    </Text>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, marginHorizontal: 5 }}
          value={inputText}
          onChangeText={setInputText}
        />
        <Button title="Send" onPress={handleMessageSend} />
      </View>
    </View>
  );
};

export default ChatGPT;
