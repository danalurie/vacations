import DownloadIcon from '@mui/icons-material/Download';
import { BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { CSVLink } from "react-csv";
import ReportModel from "../../../Models/ReportModel";
import vacationForAdminService from "../../../Services/VacationForAdminService";
import notify from "../../../Utils/Notify";
import "./FollowersReports.css";

function FollowersReports(): JSX.Element {
    const [followers, setFollowers] = useState<ReportModel[]>([]);

    Chart.defaults.font.size = 13;
    //all the categories used in the chart:
    Chart.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    useEffect(() => {
        vacationForAdminService.getFollowers()
            .then(follower => {
                const vacationsFollowers = follower.map(f => ({
                    destination: f.destination,
                    followersCount: f.followersCount
                }));
                setFollowers(vacationsFollowers);
            })
            .catch(err => notify.error(err));
    }, []);

    return (
        <div className="FollowersReports">
            <CSVLink data={followers} className="CsvLink"><DownloadIcon/></CSVLink>
            <Bar
                data={{
                    labels: followers.map(f => f.destination),
                    datasets: [{
                        label: "Number of followers for each vacation",
                        data: followers.map(f => f.followersCount),
                        backgroundColor: "#92a4c0",
                        borderColor:"#5c5470",
                        borderWidth: 3
                    }]
                }}
                options={{
                    plugins: {
                        title: { display: true },
                        legend: { display: true, position: "top" }
                    },
                    scales: {
                        y: { beginAtZero: true, ticks: { color: "black", stepSize: 1,  } },
                        x: { ticks: { color: "black" } }
                    }
                }}
            />
        </div>
    );
}

export default FollowersReports;
