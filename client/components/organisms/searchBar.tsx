
import { dir } from 'console';
import { Search } from 'lucide-react'
import React from 'react'
import Loader from '../moleculles/loader';

interface CompanyData {
    id: number;
    company: string;
}

interface Props {
    searchRef: React.RefObject<HTMLDivElement>,
    searchTerm: string,
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
    showDropdown: boolean,
    handleSelectCompany: (company: string) => void,
    companyData: CompanyData[],
    handleSearchClick: () => void;
    companyLoading: boolean;
}

const searchBar:React.FC<Props>=(
    {
        searchRef,
        searchTerm,
        setSearchTerm,
        showDropdown,
        handleSelectCompany,
        companyData,
        handleSearchClick,
        companyLoading
  
    }
) => {
  return (
    <>
            {/* Search Bar */}
            <div className="w-full flex justify-center mb-8 max-[1000px]:mt-14" ref={searchRef} >
          <div className="relative w-4/5">
            <div className="flex items-center border border-gray-300 rounded-lg p-2 justify-between bg-white shadow-sm">
              <input
                type="text"
                placeholder="Search companies"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="outline-none border-none bg-transparent w-full"
              />
              <button className="text-gray-500 hover:text-gray-700">
                <Search size={24} onClick={handleSearchClick} />
              </button>
            </div>

            {/* Search Dropdown */}
            {showDropdown && (
              <div className="absolute w-full bg-white border border-gray-300 shadow-lg rounded-lg mt-1 z-10 h-[300px] overflow-y-scroll">
                {
                  companyLoading ? (
                    <div className='w-full h-full flex items-center justify-center'>
                      <Loader />
                    </div>
                  )
                  :
                companyData?.length > 0 ? (
                  companyData.map((company) => (
                    <div
                      key={company.id}
                      className="p-3 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelectCompany(company.company)}
                    >
                      {company.company}
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-gray-500">No companies found</div>
                )}
              </div>
            )}
          </div>
        </div>
    </>
  )
}

export default searchBar