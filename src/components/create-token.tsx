"use client"

export function CreateToken(){
    return(
        <form className="">
            <div className="mb-3">
                <label className="">Token Name</label>
                <input type="text" name="name" placeholder="Enter token name" className="form-control"/>
            </div>
            <div className="mb-3">
                <label className="">Token Symbol</label>
                <input type="text" name="name" placeholder="Enter token symbol" className="form-control"/>
            </div>

            <div className="mb-3">
                <label className="">Token Description</label>
                <input type="text" name="name" placeholder="Enter token description" className="form-control"/>
            </div>
            <div className="mb-3">
                <label className="">Token Image</label>
                <input type="text" name="name" placeholder="Enter token image" className="form-control"/>
            </div>
            <div className="mb-3">
                <label className="">Token Amount</label>
                <input type="text" name="name" placeholder="Enter token image" className="form-control"/>
            </div>
             <div className="mb-3">
                <label className="">Token Decimals</label>
                <input type="text" name="name" placeholder="Enter token image" className="form-control"/>
            </div>
        </form>
    )
}