import React, {Component} from 'react'
import Sigma from './Sigma'
import Button from './Button'

export default class Pagination extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: props.currentPage || 1
    }
  }

  onChange = async page => {
    const {onChange} = this.props
    typeof onChange === 'function' && await onChange(page)
    this.setState({
      currentPage: page
    })
  }

  generateRange(currentPage, lastPage, delta = 1) {
    const range = Array(lastPage).fill().map((_, index) => index + 1)

    return range.reduce((pages, page) => {
      if (page === 1 || page === lastPage) {
        return [...pages, page]
      }

      if (page - delta <= currentPage && page + delta >= currentPage) {
        return [...pages, page]
      }
      if (pages[pages.length - 1] !== '...') {
        return [...pages, '...']
      }

      return pages
    }, [])
  }

  render() {
    const {currentPage} = this.state
    const {
      children,
      totalPages,
      prevButton = 'Prev',
      nextButton = 'Next',
      ...others
    } = this.props

    const range = this.generateRange(currentPage, totalPages);

    return (
      <Sigma
        {...others}
        >
        <Button
          onClick={e => currentPage - 1 > 0 ? this.onChange(currentPage - 1) : null}
          disabled={currentPage - 1 <= 0}
          size={'small'}
          mr={5}
          key={'-1'}
          p={[11, 12]}
        >
          {prevButton}
        </Button>
        {
          range.map((page, index) => (
            <Button
              disabled={page === '...'}
              inverted={page !== currentPage}
              size={'small'}
              p={[10, 0]}
              key={index}
              width={30}
              textAlign={'center'}
              mr={5}
              onClick={e => page !== '...' && this.onChange(page)}
            >
              {page}
            </Button>
          ))
        }
        <Button
          onClick={e => currentPage + 1 <= totalPages ? this.onChange(currentPage + 1) : null}
          disabled={currentPage + 1 > totalPages}
          size={'small'}
          mr={5}
          key={'+1'}
          p={[11, 12]}
        >
          {nextButton}
        </Button>
      </Sigma>
    )
  }
}
