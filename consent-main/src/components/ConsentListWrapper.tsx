import React, {useEffect, useMemo} from "react";
import {mountConsentList} from "consent_list/Mount";
import {UserService} from "../lib/services/userService";

export const ConsentListWrapper = () => {
    const userService = useMemo(() => new UserService(), []);
    const loadUsers = async () => {
        // await userService.get();
    }

    useEffect(() => {
        mountConsentList();
        // loadUsers();
    }, []);

    return (
        <div>
            <app-consent-list></app-consent-list>
        </div>
    );
}