class Dates {
    static formatDateToYMD(date, div = true) {
        let day  = date.split("/")[0];
        let month  = date.split("/")[1];
        let year  = date.split("/")[2];
        
        if (div) return new Date(year + '-' + ("0" + month).slice(-2) + '-' + ("0" + day).slice(-2));
        return new Date(year + ("0" + month).slice(-2) + ("0" + day).slice(-2));
    }

    static formatDateToDMY(date, div = true) {
        let year  = date.split("-")[0];
        let month  = date.split("-")[1];
        let day  = date.split("-")[2];
        
        if (div) return ("0" + day).slice(-2) + '/' + ("0" + month).slice(-2) + '/' + year;
        return year  + ("0" + month).slice(-2) + ("0" + day).slice(-2);
    }

    static formatDateToDMYWithTime(date, div = true) {
        const formattedDate = new Date(date);
        
        const year  = formattedDate.getFullYear();
        const month  = ("0" + (formattedDate.getMonth() + 1)).slice(-2);
        const day  = ("0" + formattedDate.getDate()).slice(-2);
        
        const hours = ("0" + formattedDate.getHours()).slice(-2);
        const minutes = ("0" + formattedDate.getMinutes()).slice(-2);
        const seconds = ("0" + formattedDate.getSeconds()).slice(-2);
    
        if (div) {
            return (
                ("0" + day).slice(-2) + '/' +
                ("0" + month).slice(-2) + '/' +
                year +
                ` ${hours}:${minutes}:${seconds}`
            );
        }
    
        return (
            year +
            ("0" + month).slice(-2) +
            ("0" + day).slice(-2) +
            ` ${hours}:${minutes}:${seconds}`
        );
    }
    

    static prettyDate(date) {
        let today = new Date();
        if (today.getFullYear() == date.getFullYear()) {
            if (today.getMonth() == date.getMonth()) {
                if (today.getDate() == date.getDate()) return date.toISOString().split('T')[1].slice(0, 5);
                else if ((today.getDate() - 1) == date.getDate()) return `Ontem`;
            }
        } 

        return (this.formatToDMY(date.toISOString().split('T')[0]));
    }

    static getAgeByDate(date) {
        let today = new Date();
        let birthDate = new Date(date);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    static formatTimestampForMySQL(timestamp) {
        const date = new Date(timestamp);
        const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
        return formattedDate;
    }
}

module.exports = Dates;