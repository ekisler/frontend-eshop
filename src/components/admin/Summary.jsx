import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaUsers, FaChartBar, FaClipboard } from "react-icons/fa";
import Widget from "./summary-components/Widget";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";
import Chart from "./summary-components/Chart";
import Transactions from "./summary-components/Transactions";

const Summary = () => {
    const [users, setUsers] = useState([0]);
    const [usersPercentage, setUsersPercentage] = useState(0);
    const [orders, setOrders] = useState([0]);
    const [ordersPercentage, setOrdersPercentage] = useState(0);
    const [income, setIncome] = useState([0]);
    const [incomePercentage, setIncomePercentage] = useState(0);
   
    function compare(a, b) {
        if(a._id < b._id){
            return 1
        }
        if(a._id > b._id){
            return -1
        }
        return 0;        
    }
    
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${url}/users/stats`, setHeaders())
                
                response.data.sort(compare);
                // console.log("stats", res.data);
                setUsers(response.data);
                setUsersPercentage(
                   
                    (((response.data[0].total) - response.data[1].total) / response.data[1].total) * 100);
            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${url}/orders/stats`, setHeaders())

                response.data.sort(compare);
                // console.log("stats", res.data);
                setOrders(response.data);
                setOrdersPercentage(((response.data[0].total - response.data[1].total) / response.data[1].total) * 100);
            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${url}/orders/income/stats`, setHeaders())

                response.data.sort(compare);
                // console.log("stats", res.data);
                setIncome(response.data);
                setIncomePercentage(((response.data[0].total - response.data[1].total) / response.data[1].total) * 100);
            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
    }, []);

    const data = [
        {
            icon: <FaUsers />,
            digits: users[0]?.total,
            isMoney: false,
            title: "Users",
            color: "rgb(102, 108, 255)",
            bgColor: "rgba(102, 108, 255, 0.12)",
            percentage: usersPercentage,
        },
        {
            icon: <FaClipboard />,
            digits: orders[0]?.total,
            isMoney: false,
            title: "Orders",
            color: "rgb(38, 198, 249)",
            bgColor: "rgba(38, 198, 249, 0.12)",
            percentage: ordersPercentage,
        },
        {
            icon: <FaChartBar />,
            digits: income[0]?.total ? income[0]?.total / 100 : "",
            isMoney: true,
            title: "Earnings",
            color: "rgb(253, 181, 40)",
            bgColor: "rgba(253, 181, 40, 0.12)",
            percentage: incomePercentage,
        },       
    ]

    return <StyledSummary>
        <MainStats>
            <Overview>
                <Title>
                    <h2>Overview</h2>
                    <p>How your shop is performing compared to the previous mounth.</p>
                </Title>
                <WidgetWrapper>
                    {data?.map((data, index) => (
                        <Widget key={index} data={data} />
                    ))}
                </WidgetWrapper>
            </Overview>
            <Chart />
        </MainStats>
        <SideStats>
            <Transactions />
        </SideStats>
    </StyledSummary>
};

export default Summary;

const StyledSummary = styled.div`
    width: 100%;
    display: flex;
`;

const MainStats = styled.div`
    flex: 2;
    display: flex;
`;

const Title = styled.div`
    p {
        font-size: 14px;
        color: rgba(234,234, 255, 0.68)
    }
`;

const Overview = styled.div`
    background: rgb(48, 51, 78);
    color: rgba(234, 234, 255, 0.87);
    padding: 1.5rem;
    height: 170px;
    width: 600px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const WidgetWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    font-size: 12px;
`;

const SideStats = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 2rem;
    width: 100%;
`;