import React, { useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router';
import queryString from 'query-string';
import { useForm } from '../../hooks/useForm'
import { getHeroByName } from '../../selectors/getHeroByName';
import { HeroCard } from '../hero/HeroCard';

export const SearchScreen = () => {
    
    
    const location = useLocation();
    const navigate = useNavigate();

    const {q = ''} = queryString.parse(location.search);

    const [formValues,handleInputChange] = useForm({
        searchText:  q,
    });

    const {searchText}=formValues;

    const heroesFileted = useMemo (()=>getHeroByName(q), [q]);
     

    const handleSearch =(e)=>{
        e.preventDefault();
        navigate(`?q=${searchText}`)
    }


    return (
        <>
            <h1>Search</h1>
            <hr />
            <div className="row">
                <div className="col-5">
                    <h4>Buscar</h4>
                    <hr />
                    <form onSubmit={handleSearch}>
                        <input
                        type="text"
                        placeholder="Buscar un heroe"
                        className="form-control"
                        name="searchText"
                        autoComplete="off"
                        value={searchText}
                        onChange={handleInputChange}
                        >
 
                        </input>
                        
                        <button type="submit"
                       className="btn btn-outline-primary mt-2 "
                       >Buscar ...</button>    
                      

                    </form>



                </div>
            <div className="col-7">
                <h4>Resultados</h4>
                <hr />
                {
                    (q === '')
                    ? <div className="alert alert-info">Buscar un hereo </div>
                    : (heroesFileted.length===0)
                    && <div className="alert alert-danger">No existe ese heroe</div>
                }

                {
                    heroesFileted.map(hero =>(
                        <HeroCard 
                        key={hero.id}
                        {...hero}
                        />
                    ))
                }
                </div>    
            </div>
        </>
    )
}
