import styled from "styled-components"

const PageHeaderComponent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #ccc;
    margin-bottom: 15px;
`

export default function PageHeader(props: { title: string }) {
    return (
        <PageHeaderComponent>
            <h1>{props.title}</h1>
        </PageHeaderComponent>
    )
}