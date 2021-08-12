import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'

export default class ErrorBoundary extends Component {
  static displayName = 'ErrorBoundary'

  static propTypes = {
    children: PropTypes.node,
  }

  state = {
    error: null,
    message: '',
  }

  constructor(props: any) {
    super(props)
    this.state = { error: null, message: '' }
  }

  componentDidCatch(error: any) {
    this.setState({
      error,
      message: 'Ha Ocurrido un error',
    })
  }

  render() {
    return (
      <>
        {this.state.error ? (
          <View>
            <Text>{this.state.message}</Text>
          </View>
        ) : (
          this.props.children
        )}
      </>
    )
  }

  handleDismiss = () => this.setState({ error: null })
}
