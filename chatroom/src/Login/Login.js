import React from 'react'
import {
  Alert,
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
} from 'antd'
import axios from 'axios'

import './Login.css'

class Login extends React.Component {
  state = {
    errorMsg: ''
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { username, password } = values;
        axios.post('/login', { username, password })
          .then(res => {
            const data = res.data
            if (data.code === 0) {
              this.props.history.push('./main')
            } else {
              this.setState({
                errorMsg: data.msg
              });
            }
          })
      }
    });
  };

  //click register, then move to register page
  toRegister = () => {
    this.props.history.replace('./register')
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { errorMsg } = this.state;

    return (
      <div className='login-div'>
        {/* if has errorMsg, show errorMsg */}
        {errorMsg &&
          <Alert
            message="Error"
            description={errorMsg}
            type="error"
            showIcon
          />}
        {/* login form */}
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <Button type="link" onClick={this.toRegister}>register now!</Button>
          </Form.Item>
        </Form>
      </div>

    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm