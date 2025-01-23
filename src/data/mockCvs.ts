import { Resume } from '../repo/resume';

export const mockResumes: Resume[] = [
    {
        contact_info: {
            name: {
                given_name: "John",
                family_name: "Doe",
            }
        },
        experience: [
            {
                title: "Senior Software Engineer",
                start_date: "2020-01-01",
                end_date: "2023-12-31",
                location: {
                    short_display_address: "San Francisco, CA"
                },
                gap_in_days: 0
            },
            {
                title: "Software Engineer",
                start_date: "2018-01-01",
                end_date: "2019-12-31",
                location: {
                    short_display_address: "Seattle, WA"
                },
                gap_in_days: 30
            }
        ]
    },
    {
        contact_info: {
            name: {
                given_name: "Jane",
                family_name: "Smith"
            }
        },
        experience: [
            {
                title: "Tech Lead",
                start_date: "2019-06-01",
                end_date: "2023-12-31",
                location: {
                    short_display_address: "New York, NY"
                }
            }
        ]
    }
]; 