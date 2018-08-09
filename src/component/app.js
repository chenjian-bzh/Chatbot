import '../css/main.scss'
import React from 'react'
import axios from 'axios'
import cs from 'classnames'

export default class extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            messages: [],
            isTyping: false,
            isPoped: false,
            lastDialog : null,
            dialog: null
        }
    }

    componentDidMount(){
        //http://loaclhost:8080
        axios.get('./assets/dialog/data.json')
        .then(res => { 
            this.setState({dialog: res})
        })
        .catch(err => {
            console.error(err)
        })
    }


    sendMsg(content, nextId){

    }

    render(){
        const messages = this.state.messages
        const isTyping = this.state.isTyping
        const isPoped = this.state.isPoped
        const lastDialog = this.state.lastDialog || []

        return (
            <div className='container'>
                <div className='header-box'></div>
                <div className='content-box'>
                    <ul>
                        {messages.map(msg => {
                            return <li className={cs('msg-row' , msg.owner === 'me' ? 'me-row':'cj-row')}>
                                <p className={cs('msg' , msg.owner === 'me-msg' ? 'me':'cj-msg')}>{msg.content}</p>
                            </li>
                        })}
                    </ul>
                </div>
                <div className='footer-box'>
                    <div className='tootip-box'>{isTyping ? '小健正在输入中...' : '说点什么...'}</div>
                    <div className={cs({'dialog-box':true , 'popup': isPoped})}>
                         <ul>
                             {lastDialog.map(dialog => {
                                 return <li onClick={sendMsg(dialog.content, dialog.nextId)}>
                                     {dialog.content}
                                 </li>
                             })}
                         </ul>
                    </div>
                </div>
            </div>
        )
    }

}