

class Helper {


    isEmpty = (value) => {
        if (value == "" || value == null) {
            return true;
        }
        return false;
    }
}

export default new Helper();
