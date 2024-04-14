export default function handler(req, res) {

    if (req.method == 'POST') {
        console.log('POST')
        return res.status(200).json('처리완료')

    }
    else if (req.method == 'GET') {

    }
    
}