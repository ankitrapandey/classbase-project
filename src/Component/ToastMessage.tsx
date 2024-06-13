import { Component } from 'react'
interface Showpop {
    show: boolean;
    poppup: boolean;
    hide: boolean
    message: String;

}

export default class ToastMessage extends Component<{}, Showpop> {
    constructor(Props: {}) {
        super(Props)
        this.state = {
            show: true,
            message: '',
            poppup: false,
            hide: false
        }
    }

    handlepop = () => {
        this.setState((prevState) => ({
            hide: !prevState.hide,
            poppup: true
        }));
    };

    handleconfirm = () => {
        this.setState({ show: true, poppup: true, message: 'confirm' })
        console.log('confirm')
        setTimeout(() => {
            this.setState({ show: false })
        }, 5000)

    }

    handlecancel = () => {
        this.setState({ show: true, poppup: true, message: 'cancel' })
        console.log('cancel')
        setTimeout(() => {
            this.setState({ show: false })
        }, 5000)
    }
    render() {
        // const { show, message, poppup, hide } = this.state
        return (
                <div>
                    {this.state.show && (<div style={{ float: 'right', color: 'red', fontSize: '1rem', }}>{this.state.message}

                    </div>)}
                    <div style={{height:'60vh', width:'40vw', borderRadius:'5px' ,backgroundColor:'pink'}}>
                        <h1 style={{textAlign:'center'}}>Toast Message</h1>

                        <p>Notification Message on a piece of information displayed above the page content</p>
                        <button style={{ height: '5vh', width: '8vw', fontSize:'18px', borderRadius: '5px', backgroundColor: 'skyblue', border: 'skyblue' }} onClick={this.handlepop}>{this.state.hide ? 'hide' : 'show'}</button>
                        {this.state.hide && (
                            <div className='h-[20vh] w-[30vh] bg-sky-400 m-auto'>
                                {this.state.poppup && (
                                    <div>

                                        <div style={{height:'30vh', width:'30vw', borderRadius:'5px' ,backgroundColor:'yellow'}}>
                                            <h1 style={{textAlign:'center'}}>Toast title</h1>
                                            <p>long details to go here after the title long details go here after the title</p>
                                            <button style={{ height: '5vh', width: '8vw', borderRadius: '5px', backgroundColor: 'skyblue', border: 'skyblue', fontSize: '18px' }} onClick={this.handleconfirm} >Confirm</button>
                                            <button style={{ height: '5vh', width: '8vw', borderRadius: '5px', backgroundColor: 'blue', border: 'blue', marginLeft: '5px', fontSize: '18px' }} onClick={this.handlecancel} >Cancel</button>
                                        </div>

                                    </div>
                                )}


                            </div>
                        )}
                    </div>
                </div>
        )
    }
}
