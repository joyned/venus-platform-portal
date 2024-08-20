import styled from "styled-components";
import { font, layout } from "./ui/Variables";
import UUIDService from "../service/UUIDService";
import { useLoading } from "./Loading";

interface TableProps {
    align?: string;
    active?: boolean;
}

const TableHeader = styled.thead`
    background-color: ${layout.black};
    color: white;
`;

const TableHeaderValue = styled.th<TableProps>`
    padding: 15px;
    text-align: ${(props) => props.align || "left"};
    font-size: ${font.tableHeaderFontSize};
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
    margin-bottom: 10px;

    &:nth-child(2n) {
        background-color: ${layout.lightGrey};
    }
`;

const TableData = styled.td<TableProps>`
    padding: 30px;
    font-size: ${font.textFontSize};
    text-align: ${(props) => props.align || "left"};
    color: ${font.textColor};
`;


const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 10px;
    margin-top: 20px;

    @media screen and (max-width: 40em) {
        ${TableHeader},
        ${TableBody},
        ${TableHeader},
        ${TableData},
        ${TableRow} {
            display: block;
        }

        ${TableHeader} ${TableRow} {
            position: absolute;
            top: -9999px;
            left: -9999px;
            border-bottom: 2px solid #333;
        }

        ${TableBody} ${TableRow} {
            padding: .25em;
        }

        ${TableData} {
            padding: 10px;
            display: flex;
            justify-content: space-between;

            &::before {
                content: attr(data-label);
                width: 50%;
                font-weight: bold;
                text-align: left;
            }
        }

        ${TableData}.pivoted {
            border: none !important;
            position: relative;
            padding-left: calc(50% + 10px) !important;
            text-align: left !important;
            white-space: pre-wrap;
            overflow-wrap: break-word;
        }
    }
`;

export const TableLoading = styled.div`
    background-color: #ededed;
    height: 22px;
    border-radius: 7px;
    width: 100%;
    margin-bottom: 10px;
    background: linear-gradient(to right, #eee 20%, #ddd 50%, #eee 80%);
    background-size: 200% 100%;
    background-position-x: 100%;
    animation: 1s loading ease-in-out infinite;

    @keyframes loading {
        to{
            background-position-x: -30%
        }
    }
`

export default function DataTable(props: { headers?: string[], data?: any[], dataKeys?: string[], dataTemplate?: any[] | any }) {
    const { loading } = useLoading();
    return (
        <Table>
            <TableHeader key={UUIDService.generateUUID()}>
                <TableRow key={UUIDService.generateUUID()}>
                    {props.headers?.map((header) => (
                        <TableHeaderValue key={UUIDService.generateUUID()}>{header}</TableHeaderValue>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody key={UUIDService.generateUUID()}>
                {loading && props.headers && (
                    <TableRow key={UUIDService.generateUUID()}>
                        {props.headers && props.headers.map(() => {
                            return <TableData key={UUIDService.generateUUID()}><TableLoading /></TableData>
                        })}
                    </TableRow>
                )}
                {props.dataTemplate && props.dataTemplate()}
                {props.data && props.data.map((data) => (
                    <TableRow key={UUIDService.generateUUID()}>
                        {props.dataKeys?.map((key) => (
                            <TableData key={UUIDService.generateUUID()}>{data[key]}</TableData>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export { Table, TableBody, TableData, TableHeader, TableHeaderValue, TableRow };