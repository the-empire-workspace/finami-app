import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Text, View} from 'react-native'
import {styles} from './styles'
import {translate} from 'utils'

export default class ErrorBoundary extends Component {
  static displayName = 'ErrorBoundary'

  static propTypes = {
    children: PropTypes.node,
  }

  state: any = {
    error: null,
    message: '',
  }

  constructor(props: any) {
    super(props)
    this.state = {error: null, message: ''}
  }

  componentDidCatch(error: any) {
    this.setState({
      error,
      message: 'error_happend',
    })
  }

  render() {
    return (
      <>
        {this.state.error ? (
          <View style={styles.root}>
            <View style={styles.modal}>
              <Text style={styles.title}>{translate(this.state.message)}</Text>
              <Text style={styles.body}>{this.state.error?.message}</Text>
            </View>
          </View>
        ) : (
          this.props.children
        )}
      </>
    )
  }

  handleDismiss = () => this.setState({error: null})
}
