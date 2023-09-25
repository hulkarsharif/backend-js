const fs = require("fs");
class Data {
    read(fileUrl) {
        return fs.readFileSync(fileUrl, "utf-8");
    }

    parse(content) {
        return content.split("\r\n");
    }

    parseRow(row) {
        return row.split(",");
    }

    format(fileUrl) {
        const content = this.read(fileUrl);
        const all = this.parse(content);
        const header = this.parseRow(all[0]);
        const rows = all.slice(1);

        const formattedData = rows.map((row) => {
            const personArr = this.parseRow(row);
            const personObj = {};

            for (let i = 0; i < header.length; i++) {
                const label = header[i];
                const value = personArr[i];
                personObj[label] = value;
            }

            return personObj;
        });

        return formattedData;
    }

    countByProfession(fileUrl) {
        const formattedData = this.format(fileUrl);
        const profession = formattedData.reduce((acc, personObj) => {
            const newProfession = personObj.Profession;
            if (!acc[newProfession]) {
                acc[newProfession] = 0;
            }
            acc[profession]++;
            return acc;
        }, {});
        return profession;
    }
    countByAgeRange(fileUrl) {
        const formattedData = this.format(fileUrl);
        const countByAge = formattedData.reduce(
            (acc, personObj) => {
                const age = personObj.Age;
                if (age >= 10 && age <= 20) {
                    acc["10-20"]++;
                }
                if (age >= 21 && age <= 30) {
                    acc["21-30"]++;
                }
                if (age >= 41 && age <= 50) {
                    acc["41-50"]++;
                }
                if (age >= 51 && age <= 60) {
                    acc["51-60"]++;
                }
                return acc;
            },

            { "10-20": 0, "21-30": 0, "31-40": 0, "41-50": 0, "51-60": 0 }
        );
        return countByAge;
    }
}

const data = new Data();
console.log(data.format("data.csv"));
