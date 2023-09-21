const addApplicant = `
 INSERT INTO applicants (
    email,
    firstname,
    lastname,
    password,
    phonenumber
 )
 VALUES ($1, $2, $3, $4, $5) RETURNING id, firstname, lastname, email, created_at
`;




const findApplicantByEmail = `
 SELECT id, email, password FROM applicants WHERE email=$1
`

//fetch all applicants from the db
const fetchAllApplicants = `SELECT firstname, lastname, email FROM applicants`


// fetch applicants by id from db
const fetchApplicantById = `SELECT id, firstname, lastname, email FROM applicants WHERE id=$1`




const applicantImgSrc = `
UPDATE applicants
SET applicant_image = $3 
WHERE firstname=$1,
lastname=$2 
RETURNING firstname, lastname, applicant_image
`;


module.exports = {
    addApplicant,
    findApplicantByEmail,
    fetchAllApplicants,
    fetchApplicantById,
    applicantImgSrc
}

