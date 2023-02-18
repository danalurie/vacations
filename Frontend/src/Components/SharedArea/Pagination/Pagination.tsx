import React, { ChangeEvent, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import VacationModel from '../../../Models/VacationModel';
import { authStore } from '../../../Redux/AuthState';
import { vacationsStore } from '../../../Redux/VacationState';
import vacationForAdminService from '../../../Services/VacationForAdminService';
import vacationForUserService from '../../../Services/VacationForUserService';
import VacationList from '../../VacationsArea/VacationList/VacationList';
import "./Pagination.css";

function Pagination(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);

    const vacationsPerPage = 10;
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

    useEffect(() => {
        let user = authStore.getState().user
        if (user && user.role === "Admin") {
            vacationForAdminService.getAllVacationForAdmin()
            setVacations(vacationsStore.getState().vacations);
            vacationsStore.subscribe(() => {
                setVacations(vacationsStore.getState().vacations)
            })
        }
        else {
            vacationForUserService.getAllVacationForUser()
            setVacations(vacationsStore.getState().vacations);
            vacationsStore.subscribe(() => {
                setVacations(vacationsStore.getState().vacations)
            })
        }
    }, [vacations]);


    return (
        <>
            <VacationList currentVacations={currentVacation} />
            <ReactPaginate
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
