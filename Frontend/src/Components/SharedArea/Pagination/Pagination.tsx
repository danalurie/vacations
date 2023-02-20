import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import UserModel from '../../../Models/UserModel';
import VacationModel from '../../../Models/VacationModel';
import { authStore } from '../../../Redux/AuthState';
import { vacationsStore } from '../../../Redux/VacationState';
import vacationForAdminService from '../../../Services/VacationForAdminService';
import vacationForUserService from '../../../Services/VacationForUserService';
import VacationList from '../../VacationsArea/VacationList/VacationList';
import "./Pagination.css";

function Pagination(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [user, setUser] = useState<UserModel>(authStore.getState().user);
    const [filterFollow, setFilterFollow] = useState<boolean>(false);
    const [filterFuture, setFilterFuture] = useState<boolean>(false);
    const [filterIsOn, setFilterIsOn] = useState<boolean>(false);

    //pagination:
    const vacationsPerPage = 9;
    const [startOffset, setStartOffset] = useState(0)

    //check the last vacation for current page
    const endOffset = startOffset + vacationsPerPage;

    //creating new arr for current page
    const currentVacation = vacations.slice(startOffset, endOffset);

    //calculate how many pages total
    const pageCount = Math.ceil(vacations.length / vacationsPerPage);

    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * vacationsPerPage) % vacations.length;
        setStartOffset(newOffset)
    }

    //filters:
    function filteredVacations(vacations: VacationModel[]): VacationModel[] {
        if (filterFollow) {
            vacations = vacations.filter(v => v.isFollowing);
        }
        if (filterFuture) {
            vacations = vacations.filter(v => Date.parse(v.startDate) > Date.now());
        }
        if (filterIsOn) {
            vacations = vacations.filter(v => Date.parse(v.startDate) <= Date.now() && Date.parse(v.endDate) >= Date.now());
        }

        return vacations;
    }
    useEffect(() => {
        if (user && user.role === "Admin") {
            vacationForAdminService.getAllVacationForAdmin()
            setVacations(vacationsStore.getState().vacations);
            vacationsStore.subscribe(() => {
                setVacations(vacationsStore.getState().vacations)
            })
        }
        else {
            vacationForUserService.getAllVacationForUser()
            setVacations(filteredVacations(vacationsStore.getState().vacations));
            vacationsStore.subscribe(() => {
                setVacations(vacationsStore.getState().vacations);
            })
        }
    }, [filterFollow, filterFuture, filterIsOn]);


    return (
        <>
            {user?.role === "User" &&
                <div>
                    <input type="checkbox" onChange={(e) => {
                        setFilterFollow(e.target.checked);
                        setStartOffset(0);
                    }}
                    />
                    <label>Following</label>

                    <input type="checkbox" onChange={(e) => {
                        setFilterIsOn(e.target.checked);
                        setStartOffset(0);
                    }} />
                    <label>Vacation is on now</label>

                    <input type="checkbox" onChange={(e) => {
                        setFilterFuture(e.target.checked);
                        setStartOffset(0);
                    }} />
                    <label>Future vacation</label>
                </div>
            }

            <VacationList currentVacations={currentVacation} />
            <ReactPaginate className="paginate"
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
            />
        </>
    );
}

export default Pagination;
