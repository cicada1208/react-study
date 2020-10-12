import React from 'react'
import axios from 'axios'

const withFetching = (url) => (Component) =>
    class WithFetching extends React.Component {
        constructor(props) {
            super(props)

            this.state = {
                isLoading: false,
                data: null,
                error: null,
            }
        }

        componentDidMount() {
            this.setState({ isLoading: true })

            axios.get(url)
                .then(result => this.setState({
                    isLoading: false,
                    data: result.data
                }))
                .catch(error => this.setState({
                    isLoading: false,
                    error
                }))
        }

        render() {
            return <Component {...this.props} {...this.state} />
        }
    }

const HocEx = ({ isLoading, data, error }) => {
    if (!data) {
        return <p>No data yet ...</p>
    }

    if (error) {
        return <p>{error.message}</p>
    }

    if (isLoading) {
        return <p>Loading ...</p>
    }

    return (
        <ul>
            {data.hits.map(hit =>
                <li key={hit.objectID}>
                    <a href={hit.url}>{hit.title}</a>
                </li>
            )}
        </ul>
    )
}

const url = 'http://hn.algolia.com/api/v1/search?query='
const query = 'redux'

// HOC: 複用組件邏輯
// const enhance = withFetching(url + query):
// withFetching 是一函式，回傳另一函式 HOC enhance
// withFetching 將 fetch 邏輯獨立出來以複用
// const HocFetchEx = enhance(HocEx):
// HOC enhancet 不會修改傳入的 component HocEx，僅包裝後回傳新的 component HocFetchEx
// 被包裝組件接收來自容器組件的所有 props，同時也接收新的用於 render 的 data props
// 不要在 render 方法中使用 HOC: 因為 HOC 回傳新的 component，每次 render 會重新卸載再掛載
export const HocFetchEx = withFetching(url + query)(HocEx)
