import React , {Component} from 'react'
import img1 from '../assets/img/1.jpg'

import '../css/index.scss'

export default class extends Component{
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div>
                <h1>xxx</h1>
                <div className='img'><img src={img1}/></div>
                <div className='box'></div>
                <div className='box2'></div>
            </div>
        )
    }
}

