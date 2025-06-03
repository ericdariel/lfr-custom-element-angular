/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

import {Component, OnDestroy, OnInit, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

declare const Liferay: {
    on(event: string, callback: (event: any) => void): any;
    detach(event: string, callback: any): void;
};

@Component({
    selector: 'app-root',
    styleUrls: ['./app.component.css'],
    templateUrl: './app.component.html',
    standalone: true,
    imports: [CommonModule]
})
export class AppComponent implements OnInit, OnDestroy {

    private liferayEventHandler: any;

    title: string = '';

    constructor(private cdr: ChangeDetectorRef) {}
    
    public setTitle(newTitle: string) {
        this.title = newTitle;
    }

    ngOnInit(): void {
        this.setTitle('liferay-sample-custom-element-with-importmap');

        this.liferayEventHandler = Liferay.on('updateTitle', (event: any) => {
            console.log('Événement reçu depuis Liferay :', event);
            if (event?.title) {
                console.log('Title reçu depuis Liferay :', event.title);
                this.title = event.title;
                this.cdr.detectChanges();
            }
        });
    }
    
    ngOnDestroy(): void {
        if (this.liferayEventHandler) {
            Liferay.detach('updateTitle', this.liferayEventHandler);
        }
    }
}