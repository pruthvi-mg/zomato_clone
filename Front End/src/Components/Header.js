import React from 'react';
import '../Styles/header.css';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { log } from 'react-modal/lib/helpers/ariaAppHider';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgb(211 224 229)',
        border: '1px solid #192f60'
    },
};

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            loginModalIsOpen: false,
            isLoggedIn: false,
            userName: undefined,
            signupModalIsOpen: false,
            msgModalIsOpen:false,
            authModalIsOpen : false,
            username: undefined,
            password : undefined,
            firstname: undefined,
            lastname: undefined,
            message : undefined,
            isAuthenticated : false,
            user : [],
            orderssModalIsOpen : false,
            userId : undefined,
            OrderItems :[],
            RestId : undefined
            
        
        }
    }

    componentDidMount(){
        
    }

    handleNavigate = () => {
        this.props.history.push('/');
    }

    handleModal = (state, value) => {
        this.setState({ [state]: value });
    }

    responseGoogle = (response) => {
        this.setState({ isLoggedIn: true, userName: response.profileObj.name, loginModalIsOpen: false });
    }

    handleLogout = () => {
        sessionStorage.clear();
        this.setState({ isLoggedIn: false, userName: undefined });
    }

    handleInputChange = (state, event) => {
        this.setState({ [state]: event.target.value })
    }
   
    handleSignup = (event) =>{
        event.preventDefault();

       let {username,password,firstname,lastname, } = this.state;

        const signupObj = {
            username,
            password,
            firstname,
            lastname
        }



        axios({

            method: 'POST',
            url: 'http://localhost:8080/signup',
            headers: { 'Content-Type': 'application/json' },
            data: signupObj
        })
        .then(this.setState({ signupModalIsOpen: false, msgModalIsOpen : true}))
        .catch()

    }

    handleAuth = (event) => {
        event.preventDefault();

        let {username, password, isAuthenticated} = this.state;

        const AuthObj = {
            username,
            password
        }

        axios({

            method: 'POST',
            url: 'http://localhost:8080/login',
            headers: { 'Content-Type': 'application/json' },
            data: AuthObj
        }).then(response=>{
            this.setState({ user : response.data.user, isAuthenticated: response.data.isAuthenticated});

            let {user} = this.state;  
            let typeofdata = typeof(user);
            console.log(user);
            
            user.map((item) => {
                
                 let placedByUserId = item._id;
                 console.log(placedByUserId);
                 
                 sessionStorage.setItem('placedByUserId',placedByUserId);
                 
                 this.setState({ userId: placedByUserId   });
                });

            }).catch() 
    
                 
        

        if(isAuthenticated == true){
            this.setState({ authModalIsOpen: false, isLoggedIn: true, userName: username,  });
            
            
        }else{
            
            alert("User Not Found In Database Plz Sign Up")
        }
        
    }        
                 

             

            
               
               
            
       
       

    getOrdersDetails = () => {
        
        let {userId} = this.state;;
        
        axios({
            method: 'GET',
            url: `http://localhost:8080/orders/${userId}`,
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            this.setState({ OrderItems: response.data.orders, orderssModalIsOpen: true })
            
            let {ItemsOrder} =[...this.state.OrderItems];

            ItemsOrder.map(item=>{
                let RestId = item.restaurantId;
                this.setState({RestId});
            })    
        }).catch()
            
       
       
              
    }                        
                

       
        


        
        

        
    


    render() {
        const { loginModalIsOpen, isLoggedIn, userName, signupModalIsOpen, msgModalIsOpen, authModalIsOpen,orderssModalIsOpen,OrderItems } = this.state;
        return (
            <div>
                <div className='header'>
                    <div className="header-logo" onClick={this.handleNavigate}>
                        <p>e!</p>
                    </div>
                    {isLoggedIn ? <div className="header-user">
                        
                        <div className="login">{userName}</div>
                        <div className="signup" onClick={this.handleLogout}>Logout</div>
                        <div className="signup" onClick={this.getOrdersDetails}
                        >My Orders</div>
                    </div> :
                        <div className="header-user">
                            <div className="login" onClick={() => this.handleModal('loginModalIsOpen', true)}>Login</div>
                            <div className="signup" onClick={() => {
                                this.handleModal('signupModalIsOpen', true);
                                }} >Create an account</div>
                        </div>}
                </div>
                <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles}
                >
                    <div>
                        <button className='btn btn-primary primarybtn'
                         onClick={() => {
                                    this.handleModal('loginModalIsOpen', false);
                                    this.handleModal('authModalIsOpen', true);
                                }} 
                        >Login with Credentails</button>
                        <div>
                        <div class="glyphicon glyphicon-remove googlebtn" style={{ float: 'right' , marginBottom: '10px',cursor: 'pointer' }}
                            onClick={() => this.handleModal('loginModalIsOpen', false)}></div>
                            <GoogleLogin
                                clientId="131303037139-3ekm5rpaneta4v5kd1q39djih0jvbbep.apps.googleusercontent.com"
                                buttonText="Continue with Gmail"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                    </div>
                </Modal>
                <Modal
                    isOpen={authModalIsOpen}
                    style={customStyles}
                    >
                        <div>
                        <div class="glyphicon glyphicon-remove googlebtn" style={{ float: 'right' , marginBottom: '10px',cursor: 'pointer' }}
                            onClick={() => this.handleModal('authModalIsOpen', false)}></div>
                        <form>
                            <label class="form-label">User Name/Email</label>
                            <input style={{ width: '370px' }} type="text" class="form-control" onChange={(event) => this.handleInputChange('username', event)} />
                            <label class="form-label">Password</label>
                            <input type="text" class="form-control" onChange={(event) => this.handleInputChange('password', event)} />
                            <button class="btn btn-danger" style={{ marginTop: '20px', float: 'right' }} 
                            
                            onClick={this.handleAuth}
                            
                            >Login</button>
                        </form>
                        </div>
                    </Modal>
                <Modal
                    isOpen={signupModalIsOpen}
                    style={customStyles}
                >
                    <div>
                        <div class="glyphicon glyphicon-remove" style={{ float: 'right', marginBottom: '10px' }}
                            onClick={() => this.handleModal('signupModalIsOpen', false)}></div>
                        <form>
                            <label class="form-label">User Name/Email</label>
                            <input style={{ width: '370px' }} type="text" class="form-control" onChange={(event) => this.handleInputChange('username', event)} />
                            <label class="form-label">Password</label>
                            <input type="text" class="form-control" onChange={(event) => this.handleInputChange('password', event)} />
                            <label class="form-label">First Name</label>
                            <input type="text" class="form-control" onChange={(event) => this.handleInputChange('firstname', event)} />
                            <label class="form-label">Last Name</label>
                            <input type="text" class="form-control" onChange={(event) => this.handleInputChange('lastname', event)} />
                            <button class="btn btn-danger" style={{ marginTop: '20px', float: 'right' }} 
                            
                            onClick={this.handleSignup}
                            
                            >Sign Up</button>
                        </form>
                    </div>
                </Modal>
                <Modal 
                    isOpen={msgModalIsOpen}
                    style={customStyles}>
                   

                    <div>
                    <div class="glyphicon glyphicon-remove" style={{ float: 'right', marginBottom: '10px' }}
                            onClick={() => this.handleModal('msgModalIsOpen', false)}>
                    </div>


                   
                    
                    <span>Signup Success</span>
                    </div>
                </Modal>



                <Modal 
                    isOpen={orderssModalIsOpen}
                    style={customStyles}>
                   

                    <div>
                    <div></div>
                    <div class="glyphicon glyphicon-remove" style={{ float: 'right', marginBottom: '10px' }}
                            onClick={() => this.handleModal('orderssModalIsOpen', false)}

                            ></div>
                    {OrderItems.map(item=>{
                        return <div style={{ display: 'inline-block' , marginRight : '50px'}}>
                                   <div className='OrderDetails'>Order Details</div>   

                                   <div className='OrderHeading'>Placed By</div>   
                                   <div className="placedBy OrderTitle">  {item.placedBy} </div>

                                   <div className='OrderHeading'>Placed On:</div>
                                   <div className='OrderTitle'>{item.placedOn}</div>

                                   <div className='OrderHeading'>Restaurant Name</div>
                                   <div className='placedBy OrderTitle'>{item.restaurantName}</div>

                                   <div className='OrderHeading'>Total Amount</div>
                                   <div className='OrderTitle'>Rs:{item.amount}</div>
                                    
                                   <div className='OrderHeading'>Items Ordered</div>
                                   <div className='OrderTitle'>{item.items.map(item =>{
                                       return <div> {item} </div>
                                   })}</div>

                                   <div className='OrderHeading'>Address</div>
                                   <div className='OrderTitle'>{item.address}</div>
                                    
                                   <div className='OrderHeading'>Contact Number</div>
                                   <div className='OrderTitle'>{item.contactNumber}</div>
                                    

                                   

                                   
                                   

                                  
                                  
                                   
                        
                                </div>
                    })}
                   
                    
                   
                    </div>
                </Modal>
            </div>
        )
    }
}

export default withRouter(Header);